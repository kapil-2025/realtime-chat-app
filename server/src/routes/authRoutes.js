import express from "express";
import { register,verifyOtp,login,resendOtp,forgotPassword,resetPassword,googleLogin } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validators/authSchemas.js";
const router=express.Router();
router.post("/register",validate(registerSchema),register);
router.post("/verify-otp",verifyOtp);
router.post("/login",login);
router.post("/resend-otp",resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/google", googleLogin)
export default router;
