import {z} from "zod";
const emailField=z.string().trim().toLowerCase().email("Please enter a valid email");
const otpField = z.string().trim().regex(/^\d{6}$/, "Code must be 6 digits");
export const registerSchema=z.object({
  name:z.string().trim().min(2,"Name must be at least 2 characters").max(50,"Name is too long"),
   email: emailField,
  password:z.string().min(6,"Password must be at least 6 characters").max(100,"Password is too long"),

})
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});
export const emailOnlySchema=z.object({
  email:emailField
})
export const verifyOtpSchema=z.object({
  email:emailField,otp:otpField
})
export const resetPasswordSchema = z.object({
  email: emailField,
  otp: otpField,
  newPassword: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
});
export const googleSchema = z.object({
  credential: z.string().min(1, "Google credential is required"),
});
