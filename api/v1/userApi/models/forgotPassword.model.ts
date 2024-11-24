import mongoose from "mongoose";

const { Schema } = mongoose;

const forgotPasswordSchema = new Schema({
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: () => new Date(Date.now() + 180 * 1000)
    }
}, {timestamps: true});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, 'forgot-password');

export default ForgotPassword;