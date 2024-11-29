import { Request, Response } from "express";
import User from "../models/user.model";
import { generateRandomNumber, generateRandomString } from "../../../../helpers/generate";

//[GET] /api/v1/users/not-friend
export const index = async (req: Request, res: Response): Promise<void> => {
    if(req.query.keyword) {
        
    } else {
        try {
            const users = await User.find({
                deleted: false,
                status: "active"
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
