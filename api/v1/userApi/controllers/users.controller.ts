import { Request, Response } from "express";
import User from "../models/user.model";
import { generateRandomNumber, generateRandomString } from "../../../../helpers/generate";
import { convertToSlug } from "../../../../helpers/convertToSlug";
import mongoose from "mongoose";
import usersSocket from "../socket/client/users.socket";

interface CustomRequest extends Request {
    user?: {
        id: string;
        fullName: string;
    };
}
//[GET] /api/v1/users/not-friend
export const index = async (req: CustomRequest, res: Response): Promise<void> => {
    const user = req.user as any;
    //Socket
    usersSocket(user)
    //End Socket
    if(req.query.keyword) {
        const keyword = req.query.keyword as string;
        const slug = convertToSlug(keyword);
        const slugRegex = new RegExp(slug, 'i');

        try {
            const searchConditions: any = {
                $or: [
                    { fullName: slugRegex },
                    { email: slugRegex },
                    { slug: slugRegex },
                ],
                $and: [
                    { _id: { $ne: user.id } },
                    { _id: { $nin: user.requestFriend } },
                    { _id: { $nin: user.acceptFriend } },
                ],
                deleted: false,
                status: "active",
            };

            // Nếu `slug` là ObjectId hợp lệ, thêm vào điều kiện tìm kiếm
            if (mongoose.Types.ObjectId.isValid(slug)) {
                searchConditions.$or.push({ _id: slug });
            }
            const users = await User.find(searchConditions).select("-email -password -token")
    
            res.json({
                code: 200,
                data: users
            })   
        } catch (error) {
            console.log(error)
            res.json({
                code: 400,
                message: "Invalid"
            }) 
        }
    } else {
        try {
            const users = await User.find({
                $and: [
                    { _id: { $ne: user.id } },
                    { _id: { $nin: user.requestFriends } },
                    { _id: { $nin: user.acceptFriends } },
                ],
                deleted: false,
                status: "active",
            }).select("-email -password -token")

            res.json({
                code: 200,
                data: users
            })
        } catch(err) {
            res.json({
                code: 400,
                message: "user is not exist"
            })
        }
    }
}

//[GET] /api/v1/users/inviteToFriend
export const invite = async (req: CustomRequest, res: Response): Promise<void> => {
    const type: any = req.query.type;
    const user = req.user as any
    //Socket
    usersSocket(user)
    //End Socket
    if(type === 'request'){
        try {
            const users = await User.find({
                _id: { $in: user.requestFriends},
                deleted: false,
                status: 'active'
            })
    
            res.json({
                code: 200,  
                data: users
            })
        } catch(error) {
            console.log(error)
            res.json({
                code: 400,
                message: "Invalid"
            })
        }
    } else if(type==='accept') {
        try {
            const user = req.user as any;
            const users = await User.find({
                _id: { $in: user.acceptFriends },
                deleted: false,
                status: 'active'
            })
            res.json({
                code: 200,
                data: users
            })
        } catch(error) {
            console.log(error)
            res.json({
                code: 400,
                message: "Invalid"
            })
        }
    } else {
        res.json({
            code: 400,
            message: "Invalid type"
        })
    }
}

//[GET] /api/v1/users/friends
export const friend = async (req: CustomRequest, res: Response): Promise<void> => {
    const user = req.user as any
    const friends = user.friendList.map((item: any) => item.user_id)
    console.log(friends)
    //Socket
    usersSocket(user)
    //End Socket
    try {
        const users = await User.find({
            _id: { $in: friends },
            deleted: false,
            status: 'active'
        })

        res.json({
            code: 200,  
            data: users
        })
    } catch(error) {
        console.log(error)
        res.json({
            code: 400,
            message: "Invalid"
        })
    }
}