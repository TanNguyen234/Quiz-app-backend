import mongoose from "mongoose";

const { Schema } = mongoose;

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
}, {timestamps: true});

const RoomChat = mongoose.model('RoomChat', roomChatSchema, 'room-chat');

export default RoomChat;