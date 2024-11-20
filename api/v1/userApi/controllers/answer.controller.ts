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
       answers: answers
    })
}