import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { get } from 'mongoose';
dotenv.config();

const SAME_SITE = process.env.SAME_SITE;
const SECURE = null;
 
const getSecure = process.env.SECURE;
  if (getSecure === "true") {
    SECURE = true;
  }
  else {
    SECURE = false;
  }



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
    sameSite: SAME_SITE,
    secure: SECURE,
  });
  console.log("token generated, cookie");
  console.log("token generated, cookie", token);
  console.log("token generated, cookie", SAME_SITE, typeof(SAME_SITE));
  console.log("token generated, cookie", SECURE, typeof(SECURE));
  return token;
}

export default generateToken;