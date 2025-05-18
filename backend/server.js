import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./utils/db.js"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());
app.use(cookieParser())

// Routes
import authRoutes from "./routes/authRoutes.js"
import qrRoutes from "./routes/qrRoutes.js"
import voteRoutes from "./routes/voteRoutes.js"
import otpRoutes from "./routes/otpRoutes.js"

app.use('/api/auth', authRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
