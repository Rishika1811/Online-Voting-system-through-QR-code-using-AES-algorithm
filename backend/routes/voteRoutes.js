import express from "express"
const router = express.Router();
import {
  checkVoteStatus,
  castVote,
  getAllCandidates,
  getLiveVoteCount,
} from "../controllers/voteController.js"
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/status/:voterId", checkVoteStatus); 
router.post("/cast", verifyToken, castVote); 
router.get("/live-count", verifyToken, getLiveVoteCount); 
router.get('/candidates', verifyToken, getAllCandidates);

export default router;
