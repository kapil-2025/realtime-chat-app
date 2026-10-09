import express from 'express';
import connectDB from './src/config/db.js';
import { protect } from './src/middleware/authMiddleware.js';
const app = express();
const PORT=process.env.PORT || 5000;
app.get((req,res)=>{
res.json({message:"Chat Api is running"});
})

await connectDB();
app.listen(PORT,()=>{console.log(` Server is running on port ${PORT}`)}
);

