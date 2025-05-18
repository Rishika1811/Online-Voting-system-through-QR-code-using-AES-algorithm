import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    voteCount: {
      type: Number,
      default: 0, 
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", CandidateSchema);
export default Candidate;
