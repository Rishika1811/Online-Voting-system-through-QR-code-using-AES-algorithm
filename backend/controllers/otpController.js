import User from "../models/User.js"
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken"

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { voterId } = req.body;
  
  try {
    const user = await User.findOne({ voterId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendEmail(`Your OTP is ${otp}`);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const verifyOtp = async (req, res) => {
  const { voterId, otp } = req.body;
  const user = await User.findOne({ voterId });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.otp !== otp) return res.status(401).json({ message: "Invalid OTP" });

  user.otp = null;
  user.isVerified = true;
  await user.save();

  const token = jwt.sign({ voterId }, process.env.JWT_SECRET, { expiresIn: "15m" });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: false, 
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({ success: true });
};

