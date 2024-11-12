import { Request, Response, NextFunction } from "express"
import User from "../models/user.model";

export const Auth = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
           const user = await User.findOne({
            token: token,
            status: 'active',
            deleted: false
           }).select('-password')
           req.user = user
           
        } catch (err) {
            res.json({
                code: 400,
                message: "Sending with invalid token"
            })
        }
    } else {
        res.json({
            code: 400,
            message: "Please sending with User's token"
        })
    }
    next()
}