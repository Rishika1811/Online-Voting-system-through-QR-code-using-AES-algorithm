import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18, 
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
