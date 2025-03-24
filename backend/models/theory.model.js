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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field for upvote count
theorySchema.virtual("upvoteCount").get(function () {
  return this.upvotes.length;
});

// Virtual field for downvote count
theorySchema.virtual("downvoteCount").get(function () {
  return this.downvotes.length;
});

const TheoryModel = mongoose.model("theories", theorySchema);

export default TheoryModel;
