import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import generateOtp
 from "../utils/generateOtp.js";
 import sendEmail from "../utils/sendEmail.js";
 import generateToken from "../utils/generateToken.js";
 const MAX_OTP_ATTEMPTS=5;
 const OTP_EXPIRY_MINUTES = 10;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
 const buildAuthResponse=(user)=>({
  token:generateToken(user._id),
  user:{
    _id:user._id,name:user.name,email:user.email,avatar:user.avatar
  }
 })
const issueOtp=async(email,purpose)=>{
  const otp=generateOtp();
  const otpHash=await bcrypt.hash(otp,10);
  await Otp.deleteMany({email,purpose});
  await Otp.create({
    email,otpHash,purpose,expiresAt:new Date(Date.now()+OTP_EXPIRY_MINUTES*60*1000)
  })
  const subject =purpose==="register"? "Verify your email-Chat App":"Reset your password - Chat App";
  await sendEmail(email,subject,   `<p>Your Chat App code is:</p><h2>${otp}</h2><p>This code expires in ${OTP_EXPIRY_MINUTES} minutes.</p>`)
}
const getCooldownLeft= async (email,purpose)=>{
const lastOtp=await Otp.findOne({email,purpose});
if(!lastOtp){
  return 0;
}
const secondsPassed=(Date.now()-lastOtp.createdAt.getTime())/1000;
const secondsLeft=Math.ceil(OTP_RESEND_COOLDOWN_SECONDS-secondsPassed);
return secondsLeft>0?secondsLeft:0;
}
 
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
  const cooldownLeft=await getCooldownLeft(cleanEmail,"register");
    if(cooldownLeft>0){
return res.status(429).json({message:`Please wait ${cooldownLeft} seconds before request a new OTP`});
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
  await issueOtp(cleanEmail,"register");
   res.status(201).json({ message: "OTP sent to your email" });
  }
  catch(error){
    console.error("register error :",error.message);

    return res.status(500).json({message:"Registration failed. Please try again"})
  }
 }
 export const verifyOtp=async (req,res)=>{
try{
const {email,otp}=req.body;
if(!email || !otp){
  return res.status(400).json({message:"Email and Otp are required"});
}
const cleanEmail=email.toLowerCase().trim();
const otpRecord=await Otp.findOne({email:cleanEmail,purpose:"register"})
if(!otpRecord){
  return res.status(400).json({message:"Otp expired or not found. Please register again"});
}
if(otpRecord.expiresAt<new Date()){
  await Otp.deleteOne({_id:otpRecord._id});
  return res.status(400).json({message:"Otp expired. Please register again."})
}
if(otpRecord.attempts>=MAX_OTP_ATTEMPTS){
  await Otp.deleteOne({_id:otpRecord._id});
  return res.status(429).json({message:"Too many requests"})
}
const isMatch=await bcrypt.compare(String(otp).trim(),otpRecord.otpHash);
if(!isMatch){
  otpRecord.attempts+=1;
  await otpRecord.save();
  const attemptsLeft=MAX_OTP_ATTEMPTS-otpRecord.attempts;
  return res.status(400).json({message:`Invalid Otp. ${attemptsLeft} attempts left.`});
}
const user =await User.findOne({email:cleanEmail});
if(!user)
{
  return res.status(404).json({message:"User not found. Please register again"});
}
user.isVerified=true;
await user.save();
await Otp.deleteMany({
  email:cleanEmail,purpose:"register"
})
res.json(buildAuthResponse(user));
}
catch(error){
  console.error("VerifyOtp error",error.message);
  res.status(500).json({message:"Verification failed.Please try again"})
  
}
 }
 export const login =async (req,res)=>{
  try{
const {email,password}=req.body;
if(!email || !password){
  return res.status(400).json({
    message:"Email and Password is required"
  });
}
const cleanEmail=email.toLowerCase().trim();
const user=await User.findOne({email:cleanEmail}).select("+password");
if(!user){
  return res.status(401).json({
    message:"Invalid email or password"
  });}
  if(!user.password){
    return res.status(400).json({message:"This account uses Google login. Please continue with google."});
  }
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
  return res.status(401).json({message:"Invalid email or password"})
}
if(!user.isVerified){
  return res.status(403).json({message:"Please verify your email first"});
}
res.json(buildAuthResponse(user));
  }
  catch(error){
    console.error("login error:",error.message);

    return res.status(500).json({message:"Login failed. Please try again"})
  }
 }
 export const resendOtp=async (req,res)=>{
  try{
const {email}=req.body;
if(!email){
  return res.status(400).json({
    message:"Email is required"
  });
 
} const cleanEmail=email.toLowerCase().trim();
const user=await User.findOne({email:cleanEmail});
if(!user){
  return res.status(404).json({
    message:"No account found. Please register"
  });
}
if(user.isVerified){
  return res.status(400).json({message:"Email already verified. Please login"});}
  const cooldownLeft=await getCooldownLeft(cleanEmail,"register");
if (cooldownLeft > 0) {
      return res.status(429).json({ message: `Please wait ${cooldownLeft} seconds before requesting a new OTP` });
    }
    await issueOtp(cleanEmail,"register");
       res.json({ message: "A new OTP has been sent to your email" });
  }
  catch(error){
    console.error("resendOtp error",error.message);
    res.status(500).json({message:"Could not resend OTP. Please try again."})
  }
 }

