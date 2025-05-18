import express from "express"
const router = express.Router();
import {
  checkVoteStatus,
  castVote,
  getAllCandidates
} from "../controllers/voteController.js"
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/status/:voterId", checkVoteStatus); // Check if user has voted
router.post("/cast", verifyToken, castVote); // Cast a vote
router.get('/candidates', verifyToken, getAllCandidates);

export default router;
