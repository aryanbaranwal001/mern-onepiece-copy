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
    const theoryId = req.params.theoryId; // 

    const theory = await TheoryModel.findById(theoryId);

    if (!theory) {
      return res.status(404).json({ message: "Theory not found" });
    }

    const isUpvoted = theory.upvotes.includes(userId);
    const isDownvoted = theory.downvotes.includes(userId);

    let update = {};

    if (isUpvoted) {
      update = {
        $pull: { upvotes: userId },
        $inc: { upvoteCount: -1 },
      };
    } else if (isDownvoted) {
      update = {
        $pull: { downvotes: userId },
        $addToSet: { upvotes: userId },
        $inc: { downvoteCount: -1, upvoteCount: 1 },
      };
    } else {
      update = {
        $addToSet: { upvotes: userId },
        $inc: { upvoteCount: 1 },
      };
    }

    const updatedTheory = await TheoryModel.findByIdAndUpdate(
      theoryId,
      update,
      { new: true }
    );

    return res.status(200).json({ message: "Upvote updated", theory: updatedTheory });
  } catch (error) {
    console.log("error in upvote", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const downvote = async (req, res) => {
  try {
    const userId = req.user._id;
    const theoryId = req.params.theoryId;

    const theory = await TheoryModel.findById(theoryId);

    if (!theory) {
      return res.status(404).json({ message: "Theory not found" });
    }

    const isUpvoted = theory.upvotes.includes(userId);
    const isDownvoted = theory.downvotes.includes(userId);

    let update = {};

    if (isDownvoted) {
      update = {
        $pull: { downvotes: userId },
        $inc: { downvoteCount: -1 },
      };
    } else if (isUpvoted) {
      update = {
        $pull: { upvotes: userId },
        $addToSet: { downvotes: userId },
        $inc: { upvoteCount: -1, downvoteCount: 1 },
      };
    } else {
      update = {
        $addToSet: { downvotes: userId },
        $inc: { downvoteCount: 1 },
      };
    }

    const updatedTheory = await TheoryModel.findByIdAndUpdate(
      theoryId,
      update,
      { new: true }
    );

    return res.status(200).json({ message: "Downvote updated", theory: updatedTheory });
  } catch (error) {
    console.log("error in downvote", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
