import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function initSocket(server, allowedOrigins) {
  const io = new Server(server, {
    cors: { origin: allowedOrigins },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Not authorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("_id isVerified");
      if (!user || !user.isVerified) return next(new Error("Not authorized"));

      socket.data.userId = user._id.toString();
      next();
    } catch {
      next(new Error("Not authorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    socket.join(userId);
    console.log(`🔌 connected: ${userId} (${socket.id})`);

    socket.on("disconnect", () => {
      console.log(`❌ disconnected: ${userId} (${socket.id})`);
    });
  });

  return io;
}