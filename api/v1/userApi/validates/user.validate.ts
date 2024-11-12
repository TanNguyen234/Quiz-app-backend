import { Request, Response, NextFunction } from "express"
import md5 from "md5";
import User from "../models/user.model";

export const login = async (req: Request | any, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.json({
            code: 400,
            message: "Please provide email and password"
        })
    }

    try {
        const user = await User.findOne({
            email: email,
            password: md5(password)
        })

        if(user) {
            const userInfo = {
                fullName: user.fullName,
                token: user.token
            }

            req.user = userInfo
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Invalid username or password"
        })   
    }

    next()
}