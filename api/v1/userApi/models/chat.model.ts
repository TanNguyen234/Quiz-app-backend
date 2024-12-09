import mongoose from "mongoose";

const { Schema } = mongoose;

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
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema, 'chat');

export default Chat;