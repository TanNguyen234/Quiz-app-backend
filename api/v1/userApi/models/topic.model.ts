import mongoose from "mongoose";

const { Schema } = mongoose;

const topicSchema = new Schema({
  title: String,
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

const Topic = mongoose.model('Topic', topicSchema, 'topics');

export default Topic;