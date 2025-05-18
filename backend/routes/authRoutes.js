import express from "express";
const router = express.Router();
import {
  registerUser,
  verifyOTP,
  resendOTP,
  verifyUser,
  logout
} from "../controllers/authController.js";

router.post("/register", registerUser);

router.get("/verify", verifyUser);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.post("/logout", logout);

export default router;
