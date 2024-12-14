"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slug = require('mongoose-slug-updater');
mongoose_1.default.plugin(slug);
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    fullName: String,
    avatar: String,
    slug: { type: String, slug: "fullName" },
    email: String,
    password: String,
    token: String,
    requestFriends: Array,
    acceptFriends: Array,
    friendList: [
        {
            user_id: String,
            room_chat_id: String,
        }
    ],
    status: {
        type: String,
        default: "active"
    },
    statusOnline: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema, 'users');
exports.default = User;
