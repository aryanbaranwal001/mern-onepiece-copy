import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const protectedRoute = async (req, res, next) => {

  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
    }

    decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
    const userId = decoded.userId;

    const user = await UserModel.findById({_id: userId}).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User Not Found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("error in protectedRoute",error);
    res.status(401).json({ message: 'Unauthorized' });
    
  }


};


export default protectedRoute;