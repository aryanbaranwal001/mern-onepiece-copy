import mongoose from "mongoose";

const theorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    upvoteCount: { type: Number, default: 0 }, // Added direct count field
    downvoteCount: { type: Number, default: 0 }, // Added direct count field
  },
  { timestamps: true }
);

const TheoryModel = mongoose.model("theories", theorySchema);

export default TheoryModel;
