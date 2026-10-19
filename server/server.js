import http from "http"


import express from 'express';

import cors from 'cors';
import helmet from "helmet";

import connectDB from './src/config/db.js';
import { protect } from './src/middleware/authMiddleware.js';
import   userRoutes from "./src/routes/userRoutes.js"

import authRoutes from './src/routes/authRoutes.js';
import messageRoutes from "./src/routes/messageRoutes.js";
import { authLimiter } from './src/middleware/rateLimiter.js';
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import { initSocket } from "./src/socket/index.js";
const app = express();

const PORT=process.env.PORT || 5000;
const allowedOrigins=(process.env.CLIENT_URL || "http://localhost:5173").split(",");
app.use(helmet());
app.use(cors({origin:allowedOrigins}));
app.use(express.json());
app.get("/",(req,res)=>{
res.json({message:"Chat Api is running"});
});
app.use("/api/auth",authLimiter,authRoutes );
app.use("/api/users",userRoutes);
app.use("/api/messages", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const server=http.createServer(app);
const io = initSocket(server,allowedOrigins);
app.set("io",io);
await connectDB();
server.listen(PORT,()=>{console.log(` Server is running on port ${PORT}`)}
);

