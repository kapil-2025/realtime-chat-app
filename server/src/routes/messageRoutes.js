import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { sendMessageSchema } from "../validators/messageSchemas.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(sendMessageSchema), sendMessage);
router.get("/:userId", getMessages);

export default router;