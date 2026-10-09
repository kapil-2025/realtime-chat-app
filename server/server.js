import express from 'express';
import connectDB from './src/config/db.js';
import { protect } from './src/middleware/authMiddleware.js';
import   userRoutes from "./src/routes/userRoutes.js"
import authRoutes from './src/routes/authRoutes.js';
const app = express();

const PORT=process.env.PORT || 5000;
app.use(express.json());
app.get("/",(req,res)=>{
res.json({message:"Chat Api is running"});
});
app.use("/api/auth",authRoutes );
app.use("/api/users",userRoutes);

await connectDB();
app.listen(PORT,()=>{console.log(` Server is running on port ${PORT}`)}
);

