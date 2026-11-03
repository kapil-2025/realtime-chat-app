import express from "express";
import { emailLimiter } from "../middleware/rateLimiter.js";
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
router.post("/register", validate(registerSchema), register);
router.post("/verify-otp", emailLimiter, validate(verifyOtpSchema), verifyOtp);
router.post("/login", emailLimiter, validate(loginSchema), login);
router.post("/resend-otp", emailLimiter, validate(emailOnlySchema), resendOtp);
router.post("/forgot-password", emailLimiter, validate(emailOnlySchema), forgotPassword);
router.post("/reset-password", emailLimiter, validate(resetPasswordSchema), resetPassword);
router.post("/google", validate(googleSchema), googleLogin);
export default router;
