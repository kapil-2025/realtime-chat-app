import express from "express";
import { register,verifyOtp,login,resendOtp,forgotPassword,resetPassword,googleLogin } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
  emailOnlySchema,
  verifyOtpSchema,
  resetPasswordSchema,
  googleSchema,
} from "../validators/authSchemas.js";
const router=express.Router();
router.post("/register",validate(registerSchema),register);
router.post("/verify-otp",validate(verifyOtpSchema),verifyOtp);
router.post("/login", validate(loginSchema),login);
router.post("/resend-otp",validate(emailOnlySchema),resendOtp);
router.post("/forgot-password",validate(emailOnlySchema),forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/google",validate(googleSchema), googleLogin)
export default router;
