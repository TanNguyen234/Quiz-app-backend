"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const questionSchema = new Schema({
    topicId: String,
    question: String,
    answers: Array,
    correctAnswer: Number,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true });
const Question = mongoose_1.default.model('Question', questionSchema, 'questions');
exports.default = Question;
