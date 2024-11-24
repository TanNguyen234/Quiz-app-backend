import { Request, Response } from "express";
import User from "../models/user.model";
import { generateRandomString } from "../../../../helpers/generate";
import sendMail from "../../../../helpers/sendMail";
import ForgotPassword from "../models/forgotPassword.model";

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

//[POST] /api/v1/user/forgotPassword
export const otp = async (req: Request | any, res: Response): Promise<void> => {
    const { email } = req.body;
    console.log("ok", email)
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
        console.log(existEmail)

        if(existEmail) {
            const otp = generateRandomString(6);
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
            console.log(forgotPassword)
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
