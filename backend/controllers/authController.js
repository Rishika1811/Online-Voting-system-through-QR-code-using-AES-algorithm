import User from "../models/User.js"
import qrcode from "qrcode"
import crypto from "crypto"
import { log } from "console";

const algorithm = "aes-256-cbc";
const secretKey = process.env.AES_SECRET_KEY; 

function encryptData(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { fullName, age, gender, voterId, email } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { voterId }] });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const encryptedPayload = encryptData(`${voterId}:${email}`);
    const qrCode = await qrcode.toDataURL(`http://localhost:5173/details/${encodeURIComponent(encryptedPayload)}`);
    // console.log(qrCode);

    const newUser = new User({
      fullName,
      age,
      gender,
      voterId,
      email,
      qrCode,
      otp,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Registration successful",
      qrCode,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// @route POST /api/auth/verify-otp
export const verifyOTP = async (req, res) => {
  try {
    const { voterId, otp } = req.body;

    const user = await User.findOne({ voterId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    await user.save();

    return res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @route POST /api/auth/resend-otp
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();
    await sendOTPEmail(email, otp);

    return res.status(200).json({ message: "OTP resent" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @route POST /api/auth/verify
export const verifyUser = async (req, res) => {
  res.json({ authorized: true, voterId: req.user.voterId });
}

// @route POST /api/auth/logout
export const logout = async (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "Lax", 
    secure: false,
  });
  res.json({ message: "Logged out successfully" });
}
