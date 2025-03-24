import TheoryModel from "../models/theory.model.js";

export const latest = async (req, res) => {
  try {
    //fetches the latest theories from the database
    const theories = await TheoryModel.find().sort({ createdAt: -1 });
    return res.status(200).json(theories);
  } catch (error) {
    console.log("error in theoryCommon latest route::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const top = async (req, res) => {
  try {
    const sortedTheories = await TheoryModel.aggregate([
      {
        $addFields: {
          upvoteCount: { $size: "$upvotes" }, // Calculate number of upvotes
          downvoteCount: { $size: "$downvotes" }, // Calculate number of downvotes
        },
      },
      {
        $sort: { upvoteCount: -1 }, // Sort by upvote count in descending order
      },
    ]);
    res.status(200).send(sortedTheories);
  } catch (error) {
    console.log("error in top in theoryCommonRoutes::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const upvote = async (req, res) => {
  try {
    const userId = req.user._id;
    const theoryId = req.params.upvoteId;

    const updatedTheory = await TheoryModel.findByIdAndUpdate(
      theoryId,
      {
        $addToSet: { upvotes: userId }, // Add userId if not already present
        $pull: { downvotes: userId }, // Remove from downvotes if present
      },
      { new: true } // Return updated document
    );

    if (!updatedTheory) {
      return res.status(404).json({ message: "Theory not found" });
    }

    return res
      .status(200)
      .json({ message: "Upvoted successfully", theory: updatedTheory });
  } catch (error) {
    console.log("error in upvote", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downvote = async (req, res) => {
  try {
    const userId = req.user._id;
    const theoryId = req.params.downvoteId;

    const updatedTheory = await TheoryModel.findByIdAndUpdate(
      theoryId,
      {
        $addToSet: { downvotes: userId }, // Add userId to downvotes if not present
        $pull: { upvotes: userId }, // Remove from upvotes if present
      },
      { new: true } // Return updated document
    );

    if (!updatedTheory) {
      return res.status(404).json({ message: "Theory not found" });
    }

    return res
      .status(200)
      .json({ message: "Downvoted successfully", theory: updatedTheory });
  } catch (error) {
    console.log("error in downvote", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
