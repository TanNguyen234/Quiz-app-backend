import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
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
}, {timestamps: true});

const User = mongoose.model('User', userSchema, 'users');

export default User;