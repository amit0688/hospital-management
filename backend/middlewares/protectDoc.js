import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Doctor } from '../models/DoctorSchema.js';

const protectDoc = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userData = await Doctor.findById(decoded.userId).select('-password');

      req.user = userData;
      // console.log(userData)

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const verifyDoc = asyncHandler(async (req, res, next) => {


  const checkRole = req.user.role;

  if(checkRole === "doctor"){
      next()
  }else{
    throw new Error("Access is Unauthorised")
  }
})

export { protectDoc, verifyDoc };