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
                id: user.id,
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

export const register = async (req: Request | any, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        res.json({
            code: 400,
            message: "Please provide full of information"
        })
        return;
    } else {
        const userExist = await User.findOne({
            email: email,
            deleted: false,
            status: "active"
        })

        if(userExist) {
            res.json({
                code: 400,
                message: "Email already registered"
            })
            return;
        } else {
            req.userRegister =  {
                fullName: fullName,
                email: email,
                password: md5(password)
            }
        }
    }

    next()
}