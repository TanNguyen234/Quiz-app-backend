import mongoose from "mongoose";

const { Schema } = mongoose;

const AnswerSchema = new Schema(
  {
    userId: String,
    topicId: String,
    answers: Object,
    status: {
      type: String,
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", AnswerSchema, "answers");

export default Answer;
