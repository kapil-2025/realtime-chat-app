import mongoose from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    if (req.user._id.toString() === receiverId) {
      return res.status(400).json({ message: "You can't message yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver || !receiver.isVerified) {
      return res.status(404).json({ message: "User not found" });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("sendMessage error:", error.message);
    res.status(500).json({ message: "Could not send message. Please try again." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(messages.reverse());
  } catch (error) {
    console.error("getMessages error:", error.message);
    res.status(500).json({ message: "Could not load messages. Please try again." });
  }
};