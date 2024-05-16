import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/UserSchema.js'

const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userData = await User.findById(decoded.userId).select('-password');

      req.user = userData;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    console.log("Not authorized")
    throw new Error('Not authorized, no token');
  }
});

export {protectUser}