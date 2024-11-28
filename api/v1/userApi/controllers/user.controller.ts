import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomNumber, generateRandomString } from "../../../../helpers/generate";
import sendMail from "../../../../helpers/sendMail";
import ForgotPassword from "../models/forgotPassword.model";

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
export const login = (req: Request | any, res: Response): void => {
    if(req.user) {
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
export const detail = (req: Request | any, res: Response): void => {
    if(req.user) {
        const user = {
            id: req.user.id,
            fullName: req.user.fullName,
            email: req.user.email,
            token: req.user.token
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