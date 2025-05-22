import User from "../models/User.js"
import Candidate from "../models/Candidate.js"
import Vote from "../models/Vote.js"

export const checkVoteStatus = async (req, res) => {
  try {
    const { voterId } = req.params;
    const user = await User.findOne({ voterId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User vote status retrieved successfully",
      hasVoted: user.hasVoted, // Return if the user has voted or not
    });
  } catch (error) {
    console.error("Vote Status Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 

export const castVote = async (req, res) => {
  try {
    const { voterId, candidateId } = req.body;
    
    const user = await User.findOne({ voterId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const newVote = new Vote({
      voterId,
      candidateId,
    });

    await newVote.save();

    user.hasVoted = true;
    await user.save();

    candidate.voteCount += 1;
    await candidate.save();

    return res.status(200).json({
      message: "Vote casted successfully",
      updatedVoteCount: candidate.voteCount,
    });
  } catch (error) {
    console.error("Casting Vote Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @route GET /api/vote/live-count
export const getLiveVoteCount = async (req, res) => {
  try {
    const candidates = await Candidate.find().select("name voteCount");

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
    }

    // Calculate total votes
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.voteCount, 0);

    // Add %votes to each candidate
    const candidatesWithPercentages = candidates.map(candidate => ({
      ...candidate.toObject(),
      percentVotes: totalVotes === 0 ? 0 : ((candidate.voteCount / totalVotes) * 100).toFixed(2)
    }));

    return res.status(200).json({
      message: "Live voting count retrieved successfully",
      candidates: candidatesWithPercentages,
      totalVotes,
    });
  } catch (error) {
    console.error("Live Vote Count Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Server error while fetching candidates' });
  }
};