import {z} from "zod";
export const sendMessageSchema=z.object({
    receiverId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user"),
      text: z.string().trim().min(1, "Message can't be empty").max(2000, "Message is too long"),
})