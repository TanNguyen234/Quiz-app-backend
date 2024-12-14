import mongoose from "mongoose";
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String,
  avatar: String,
  slug: {type: String, slug: "fullName"},
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
}, {timestamps: true});

const User = mongoose.model('User', userSchema, 'users');

export default User;