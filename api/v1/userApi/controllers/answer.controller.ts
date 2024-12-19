import { Request, Response } from "express"
import Answer from "../models/answer.model"

//[GET] /api/v1/answers/submit
export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const answers = new Answer(req.body);
        await answers.save();
        if(!answers) throw new Error(`Error saving`);
        res.json({
            code: 200,
            data: answers
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            message: "Error saving answer"
        })
        return;
    }
}
//[GET] /api/v1/answers/result
export const result = async (req: Request | any, res: Response): Promise<void> => {
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
        const userId: string = req.user.id;
        const data = await Answer.find({
            userId: userId,
            status: 'active',
            deleted: false
        }).select('createdAt topicId answers');

        res.json({
            code: 200,
            data: data
        })
    }
}