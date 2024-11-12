import { Request, Response } from "express";
import User from "../models/user.model";
import { generateRandomString } from "../../../../helpers/generate";

//[POST] /api/v1/user/login
export const login = (req: Request | any, res: Response) => {
    if(req.user) {
        res.json({
            code: 200,
            data: req.user
        })
    } else {
        res.json({
            code: 400,
            messsage: "Invalid email or password"
        })
    }
}

//[POST] /api/v1/user/register
export const register = async (req: Request | any, res: Response) => {
    const userSave = req.userRegister
    if(userSave) {
        userSave.token = generateRandomString(30);
        try {
            const user = new User(userSave)
            await user.save();
            res.json({
                code: 200,
                data: {
                    fullName: user.fullName,
                    token: user.token
                }
            })
        } catch (error) {
            res.json({
                code: 500,
                message: "Error saving user"
            })
        }
    } else {
        res.json({
            code: 400,
            messsage: "Invalid User's provided information"
        })
    }
}

// [GET] /api/v1/user/detail
export const detail = (req: Request | any, res: Response) => {
    if(req.user) {
        const user = {
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