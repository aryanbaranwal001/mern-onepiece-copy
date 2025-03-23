import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId, res) => {
  
  //signs the token
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1d',
  });

  //sets the cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
  });

  return token;
}

export default generateToken;