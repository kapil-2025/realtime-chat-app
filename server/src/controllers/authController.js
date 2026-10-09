import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import generateOtp
 from "../utils/generateOtp.js";
 import sendEmail from "../utils/sendEmail.js";
 export const register = async (req,res)=>{
  try{
const {name,email,password}=req.body;
if(!name|| !email || !password){
  return res.status(400).json({message:"Name, email and password are required"});

}
  if(password.length<6){
    return res.status(400).json({message:"Password must be at least 6 characters "});
  }
  const cleanEmail=email.toLowerCase().trim();
  const existingUser=await User.findOne({email:cleanEmail});
  if(existingUser && existingUser.isVerified){
    return res.status(409).json({
      message:"Email already registered. Please login."
    })

  }
  const hashedPassword=await bcrypt.hash(password,10);
  if(existingUser){
    existingUser.name=name;
    existingUser.password=hashedPassword;
    await existingUser.save();
  }
  else{
    await User.create({name,email:cleanEmail,password:hashedPassword});
  }
  const otp=generateOtp();
  const otpHash=await bcrypt.hash(otp,10);
  await Otp.deleteMany({email:cleanEmail,purpose:"register"});
  await Otp.create({
    email:cleanEmail,otpHash,purpose:"register",expiresAt:new Date(Date.now()+10*60*1000)
  });
  await sendEmail(
    cleanEmail,"Verify your email-Chat App",`<p>Your Chat App verification code is: </p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`
    
  )
  res.status(201).json({message:"OTP sent to your gmail"});
  }
  catch(error){
    console.error("register error :",error.message);

    return res.status(500).json({message:"Registration failed. Please try again"})
  }
 }