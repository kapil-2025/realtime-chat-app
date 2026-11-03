import rateLimit from "express-rate-limit";

// Saare auth routes: ek IP se 15 min mein 30 requests
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: { message: "Too many requests. Please try again in a few minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login/OTP: ek email pe 15 min mein 8 attempts
export const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  keyGenerator: (req) => String(req.body?.email ?? "").trim().toLowerCase(),
  message: { message: "Too many attempts for this email. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});