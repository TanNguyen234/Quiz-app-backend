import { Request, Response } from "express";

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