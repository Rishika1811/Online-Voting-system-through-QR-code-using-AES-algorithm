import express from "express"
import { getUserFromQRToken } from '../controllers/qrController.js'
const router = express.Router();

router.get("/decrypt/:token", getUserFromQRToken);

export default router;
