"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const forgotPasswordSchema = new Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: {
            type: Date,
            expires: 180
        }
    }
}, { timestamps: true });
const ForgotPassword = mongoose_1.default.model('ForgotPassword', forgotPasswordSchema, 'forgot-password');
exports.default = ForgotPassword;
