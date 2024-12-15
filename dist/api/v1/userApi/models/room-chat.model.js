"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const roomChatSchema = new Schema({
    title: String,
    avatar: String,
    typeRoom: String,
    status: String,
    users: [
        {
            user_id: String,
            role: String
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, { timestamps: true });
const RoomChat = mongoose_1.default.model('RoomChat', roomChatSchema, 'room-chat');
exports.default = RoomChat;
