import { Request, Response } from "express"
import Question from "../models/question.mode";
import Topic from "../models/topic.model";

//[GET] /api/v1/questions/:id
export const index = async (req: Request, res: Response) => {
    const id: String = req.params.id

    if(id) {
        const topic = await Topic.findOne({
            _id: id,
            deleted: false,
            status: "active"
        })

        if(topic) {
            const data = await Question.find({
                topicId: id,
                status: 'active',
                deleted: false
            });
            
            res.json({
                topic: topic,
                code: 200,
                data: data
            })
        } else {
            res.json({
                code: 400,
                message: 'Invalid ID'
            })
        }
    } else {
        res.json({
            code: 400,
            message: 'Invalid ID'
        })
    }
}