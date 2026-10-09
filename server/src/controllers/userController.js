import User from "../models/User.js";
import Otp from "../models/Otp.js";
export const getUsers = async (req, res) => {
  try {
    const users = (
      await User.find({ _id: { $ne: req.user._id }, isVerified: true }).select(
        "name email avatar",
      )
    ).sort({ name: 1 });
    res.json(users);
  } catch (error) {
    console.error("getusers error", error.message);
    res.status(500).json({message:"failed to fetch users"});
  }
};
