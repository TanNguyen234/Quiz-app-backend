import { Request, Response, NextFunction } from "express";

export const answer = (req: Request, res: Response, next: NextFunction) => {
    const { userId, topicId, answers } = req.body;

    if(!userId) {
        res.json({
            code: 400,
            message: "Invalid user"
        })
        return;
    }

    if(!topicId) {
        res.json({
            code: 400,
            message: "Invalid topic"
        })
        return;
    }

    if(!answers || answers.length === 0) {
        res.json({
            code: 400,
            message: "Invalid answers"
        })
        return;
    }

    next()
}