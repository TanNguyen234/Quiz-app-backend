import mongoose from "mongoose";

const { Schema } = mongoose;

const forgotPasswordSchema = new Schema({
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: {
        type: Date,
        expires: 180 // TTL sau 180 giây (3 phút)
    }
    }
}, {timestamps: true});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, 'forgot-password');

export default ForgotPassword;