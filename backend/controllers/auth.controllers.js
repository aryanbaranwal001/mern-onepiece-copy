import UserModel from "../models/user.model.js";

export const signup = async (req, res) => {
const {username, email, password} = req.body;




};

export const login = async (req, res) => {
  res.send("login");
};

export const logout = async (req, res) => {
  res.send("logout");
};
