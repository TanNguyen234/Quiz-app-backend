import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
    topicId: String,
    question: String,
    answers: Array,
    correctAnswer: Number,
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

const Question = mongoose.model('Question', questionSchema, 'questions');

export default Question;