"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = void 0;
const answer = (req, res, next) => {
    const { userId, topicId, answers } = req.body;
    if (!userId) {
        res.json({
            code: 400,
            message: "Invalid user"
        });
        return;
    }
    if (!topicId) {
        res.json({
            code: 400,
            message: "Invalid topic"
        });
        return;
    }
    if (!answers || answers.length === 0) {
        res.json({
            code: 400,
            message: "Invalid answers"
        });
        return;
    }
    next();
};
exports.answer = answer;
