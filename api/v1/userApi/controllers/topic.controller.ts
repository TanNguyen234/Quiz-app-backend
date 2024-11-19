import { Request, Response } from "express"
import Topic from "../models/topic.model"

//[GET] /api/v1/topics
export const index = async (req: Request, res: Response): Promise<void> => {
    const id: any = req.query.id;

    if(id) {
        const data = await Topic.findOne({
            _id: id,
            status: 'active',
            deleted: false
        });

        if(data) {
            res.json({
                code: 200,
                data: data
            })
        } else {
            res.json({
                code: 400,
                message: "Invalid id"
            })
        }
    } else {
        const data = await Topic.find({
            status: 'active',
            deleted: false
        });

        res.json({
            code: 200,
            data: data
        })
    }
}