import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";




export const signup = async (req, res) => {
  
  try {
  const {username, email, password} = req.body;
  // checks if all fields are correct
  if (!email || !username || !password) {
    return res.status(400).json({
      message: "all fields, email, username & password must be given",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }
  
  // checks if user already exits
  const user = await UserModel.findOne({ email })  
  if (user) {
    return res.status(400).json({ message: "User with this email already exists" });
  }

  //hashes password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({ message: "User registered successfully" }z);
    
  } catch (error) {
    console.log("error in signup",error);
    return res.status(500).json({message:"internal server error"});
  }


};

export const login = async (req, res) => {
  res.send("login");
};

export const logout = async (req, res) => {
  res.send("logout");
};
