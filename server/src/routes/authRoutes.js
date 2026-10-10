import express from "express";
import { register,verifyOtp,login,resendOtp,forgotPassword } from "../controllers/authController.js";
const router=express.Router();
router.post("/register",register);
router.post("/verify-otp",verifyOtp);
router.post("/login",login);
router.post("/resend-otp",resendOtp);
router.post("/forgot-password", forgotPassword);
export default router;
