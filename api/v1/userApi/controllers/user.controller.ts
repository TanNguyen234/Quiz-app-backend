import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomNumber, generateRandomString } from "../../../../helpers/generate";
import sendMail from "../../../../helpers/sendMail";
import updateStatus from '../../../../helpers/updateStatusUser';
import ForgotPassword from "../models/forgotPassword.model";
import usersSocket from "../socket/client/users.socket";
import { uploadToCloudinary } from "../../../../helpers/uploadToCloudinary";

const io = (global as any)._io;

//[GET] /api/v1/user
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

//[POST] /api/v1/user/login
export const login = async (req: Request | any, res: Response): Promise<void> => {
    if(req.user) {
        //Socket io
        usersSocket(req.user)
        //Socket io
        updateStatus(req.user.id, 'online')

        res.json({
            code: 200,
            data: req.user
        })
    } else {
        res.json({
            code: 400,
            message: "Invalid email or password"
        })
    }
}

//[POST] /api/v1/user/register
export const register = async (req: Request | any, res: Response): Promise<void> => {
    const userSave = req.userRegister
    if(userSave) {
        userSave.token = generateRandomString(30);
        try {
            const user = new User(userSave)
            await user.save();
            res.json({
                code: 200,
                data: {
                    id: user.id,
                    fullName: user.fullName,
                    token: user.token
                }
            })
            return;
        } catch (error) {
            res.json({
                code: 500,
                message: "Error saving user"
            })
            return;
        }
    } else {    
        res.json({
            code: 400,
            message: "Invalid User's provided information"
        })
        return;
    }
}

// [GET] /api/v1/user/detail
export const detail = async (req: Request | any, res: Response): Promise<void> => {
    if(req.user) {
        //Socket io
        usersSocket(req.user)
        //Socket io
        updateStatus(req.user.id, 'online')

        const user = {
            id: req.user.id,
            fullName: req.user.fullName,
            email: req.user.email,
            token: req.user.token,
            avatar: req.user.avatar,
            createdAt: req.user.createdAt,
        }

        res.json({
            code: 200,
            data: user
        })
    } else {
        res.json({
            code: 400,
            message: "Invalid token"
        })
    }
}

//[POST] /api/v1/user/otp
export const otp = async (req: Request | any, res: Response): Promise<void> => {
    const { email } = req.body;
    if(!email) {
        res.json({
            code: 400,
            message: "Invalid email"
        })
        return;
    }
    try {
        const existEmail = await User.findOne({
            email: email,
            deleted: false
        })

        if(existEmail) {
            const otp = generateRandomNumber(8);
            const forgotPassword = new ForgotPassword({
                email,
                otp
            })
            forgotPassword.save()
            const subject = "Mã xác minh lấy lại mật khẩu"
            const html = `
                <h1>Mã xác minh đổi mật khẩu</h1>
                <duv>Mã xác minh của bạn là: <b style='color: green'>${otp}<b></div>
                <p>Thời hạn sử dụng là 3 phút.</p>`//Muốn css phải style inline
            sendMail(email, subject, html)
            res.json({
                code: 200,
                message: "OTP sent successfully"
            })
        }

    } catch (error) {
        res.json({
            code: 400,
            message: "Invalid email"
        })
    }
}

//[POST] /api/v1/user/password/checkOTP
export const checkOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    if(!email ||!otp) {
        res.json({
            code: 400,
            message: "Invalid email or OTP"
        })
        return;
    }
    try {
        const forgotPassword = await ForgotPassword.findOne({
            email: email,
            otp: otp,
            expireAt: new Date(),
            deleted: false
        })
        if(forgotPassword) {
            res.json({
                code: 200,
                id: forgotPassword.id,
                message: "success"
            })
        } else {
            throw new Error("Không tìm thấy");
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Invalid email or OTP"
        })
    }
}

//[POST] /api/v1/user/password/change
export const change = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if(!email ||!password) {
        res.json({
            code: 400,
            message: "Email or password is required"
        })
    } else {
        try {
            const user = await User.updateOne({
                email: email
            }, {
                password: md5(password)
            })
            if(!user) {
                throw new Error('error')
            }
            res.json({
                code: 200,
                message: "success"
            })
        } catch (error) {
            res.json({
                code: 400,
                message: "error"
            })
        }
    }
}
//[GET] /api/v1/user/logout
export const logout = async (req: Request | any, res: Response): Promise<void> => {
    if(req.user) {
        //Socket io
        usersSocket(req.user)
        //Socket io
        updateStatus(req.user.id, 'offline')

        await User.updateOne({
            _id: req.user.id
        },{
            statusOnline: 'offline'
        })
    }
}
interface UserInter {
    avatar?: string
    fullName?: string
    email?: string
}
//[PATCH] /api/v1/user/changeInfo
export const changeInfo = async (req: Request | any, res: Response): Promise<void> => {
    const saveObj: UserInter = {}
    const { fullName, email } = req.body
    const id: string = req.user.id
    var mimetype: string = "", buffer: Buffer = Buffer.from("")

    if(req.file) {
        mimetype = req.file.mimetype
        buffer = req.file.buffer
    }
    if(!mimetype && !buffer && !fullName && !email) {
        res.json({
            code: 400,
            message: "Invalid information"
        })
        return;
    }
    if (mimetype && buffer) {
        const img: string = await uploadToCloudinary(buffer, mimetype)
        saveObj["avatar"] = img
    } 
    if(fullName) {
        saveObj["fullName"] = fullName
    }
    if(email) {
        const existEmail = await User.findOne({
            email: email,
            _id: { $ne: id }
        })
        if(existEmail) {
            res.json({
                code: 400,
                message: "Email is exist"
            })
            return;
        }
        saveObj["email"] = email
    }
    try {
        await User.updateOne({
            _id: id
        }, saveObj)
        res.json({
            code: 200
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
