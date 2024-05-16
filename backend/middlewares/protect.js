import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Hospital } from '../models/HospitalSchema.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userData = await Hospital.findById(decoded.userId).select('-password');

      req.user = userData;

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

const verifyHos = asyncHandler(async (req, res, next) => {


  const checkRole = req.user.role;

  if(checkRole === "hospital"){
      next()
  }else{
    throw new Error("Access is Unauthorised")
  }
})


const verifyData = asyncHandler(async (req, res, next) => {
  const pincode = req.user.pincode;
  const city = req.user.city;
  const state = req.user.state;
  const address = req.user.address;
  const map = req.user.map;

  if (pincode === "") {
    throw new Error("Set pincode field");
  } else if (city === "") {
    throw new Error("You haven't selected any city yet");
  } else if (state === "") {
    throw new Error("You haven't selected any state yet");
  } else if (address === "") {
    throw new Error("Set address field");
  } else if (map === "") {
    throw new Error("You haven't provided any map link yet");
  } else {
    next();
  }
});







export { protect, verifyHos, verifyData };