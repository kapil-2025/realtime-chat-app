import {z} from "zod";
export const registerSchema=z.object({
  name:z.string().trim().min(2,"Name must be at least 2 characters").max(50,"Name is too long"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),
  password:z.string().min(6,"Password must be at least 6 characters").max(100,"Password is too long"),

})
