import mongoose from "mongoose";
import { maxLength } from "zod";
const messsageSchema= new mongoose.Schema({
sender:{
  type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,
},
receiver:{
  type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,
},text:{
  type:String,required:true,trim:true,maxLength:2000,
},
},{timestamps:true});
messsageSchema.index({sender:1,receiver:1,createdAt:1});
const Message=mongoose.model("Message",messsageSchema);
export default Message;