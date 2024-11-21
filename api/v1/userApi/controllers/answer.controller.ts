import { Request, Response } from "express"
import Answer from "../models/answer.model"

//[GET] /api/v1/answers/submit
export const index = async (req: Request, res: Response): Promise<void> => {
    const answers = new Answer(req.body);
    answers.save();

    if(!answers) {
        res.json({
            code: 500,
            message: "Error saving answer"
        })
        return;
    }

    res.json({
       code: 200,
       data: answers
    })
}
//[GET] /api/v1/answers/result
export const result = async (req: Request, res: Response): Promise<void> => {
    const id: any = req.query.id;

    if(id) {
        const data = await Answer.findOne({
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
        const data = await Answer.find({
            status: 'active',
            deleted: false
        });

        res.json({
            code: 200,
            data: data
        })
    }
}