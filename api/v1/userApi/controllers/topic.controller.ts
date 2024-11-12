import { Request, Response } from "express"
import Topic from "../models/topic.model"

//[GET] /api/v1/topics
export const index = async (req: Request, res: Response) => {
    const data = await Topic.find({
        status: 'active',
        deleted: false
    });

    res.json({
        code: 200,
        data: data
    })
}