import User from "../models/User.js"
import crypto from "crypto"
const algorithm = "aes-256-cbc";
const secretKey = process.env.AES_SECRET_KEY; 

function decryptData(token) {
  const [ivHex, encrypted] = token.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const getUserFromQRToken = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = decodeURIComponent(token);
    const decrypted = decryptData(decodedToken); 

    const [voterId, email] = decrypted.split(":");

    const user = await User.findOne({ voterId, email }).select("-otp"); 

    if (!user) {
      return res.status(404).json({ message: "User not found or invalid QR" });
    }

    return res.status(200).json({
      message: "User data retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("QR Scan Error:", error);
    return res.status(400).json({ message: "Invalid or expired QR token" });
  }
};
