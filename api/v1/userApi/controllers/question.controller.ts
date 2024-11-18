import { Request, Response } from "express"
import Question from "../models/question.mode";
import Topic from "../models/topic.model";

//[GET] /api/v1/questions/:id
export const index = async (req: Request, res: Response) => {
    const id: String = req.params.id

    if(id) {
        try {
            const topic = await Topic.findOne({
                _id: id,
                deleted: false,
                status: "active"
            })
    
            if(topic) {
                const data = await Question.find({
                    topicId: topic._id,
                    deleted: false,
                    status: "active"
                })

                res.json({
                    topic: topic,
                    code: 200,
                    data: data
                })

                return;
            }
        } catch (error) {
            res.json({
                code: 400,
                message: 'Invalid ID'
            })
            return;
        }
    } else {
        res.json({
            code: 400,
            message: 'Invalid ID'
        })
        return;
    }
}