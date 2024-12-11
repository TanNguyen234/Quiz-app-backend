"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const chatSchema = new Schema({
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, { timestamps: true });
const Chat = mongoose_1.default.model('Chat', chatSchema, 'chat');
exports.default = Chat;
