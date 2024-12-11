"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const question_mode_1 = __importDefault(require("../models/question.mode"));
const topic_model_1 = __importDefault(require("../models/topic.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id) {
        try {
            const topic = yield topic_model_1.default.findOne({
                _id: id,
                deleted: false,
                status: "active"
            });
            if (topic) {
                const data = yield question_mode_1.default.find({
                    topicId: topic._id,
                    deleted: false,
                    status: "active"
                });
                res.json({
                    topic: topic,
                    code: 200,
                    data: data
                });
                return;
            }
        }
        catch (error) {
            res.json({
                code: 400,
                message: 'Invalid ID'
            });
            return;
        }
    }
    else {
        res.json({
            code: 400,
            message: 'Invalid ID'
        });
        return;
    }
});
exports.index = index;
