import { User } from '../models/UserSchema.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { Doctor } from '../models/DoctorSchema.js'

import {Booking} from '../models/BookingSchema.js'

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password, phone, gender } = req.body;
    if (fullname.length < 2) {
        res.status(400);
        throw new Error('Enter full name')
    }

    if (email.length < 2) {
        res.status(400);
        throw new Error('Enter email')
    }
    if (password.length < 2) {
        res.status(400);
        throw new Error('Enter password')
    }
    if (phone.length < 2) {
        res.status(400);
        throw new Error('Enter password')
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exist by this email id')
    }

    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        res.status(400);
        throw new Error("Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const user = await User.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        phone,
        gender
    })


    if (user) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phone: user.phone,
            gender: user.gender,
            state: user.state,
            city: user.city,
            address: user.address,
            avatar: avatar.url,
        })
    }else{
        res.status(401);
        throw new Error('Some thing went wrong')
    }
});

const googleReg = asyncHandler (async(req, res) => {
  const {name, email, avatar} = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exist by this email id')
      }

    const user = await User.create({
          fullname: name,
          email,
          avatar,
      })
    

    if (user) {
      generateToken(res, user._id);

      res.status(200).json({
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          phone: user.phone,
          gender: user.gender,
          state: user.state,
          city: user.city,
          address: user.address,
          avatar: user.avatar,
      })
  }else{
      res.status(401);
      throw new Error('Some thing went wrong')
  }
  } catch (error) {
    throw new Error(error)
  }
})

const googleLogin = asyncHandler (async(req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('User not found')
    }
    else {
      generateToken(res, user._id);

      res.status(200).json({
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          phone: user.phone,
          gender: user.gender,
          state: user.state,
          city: user.city,
          address: user.address,
          avatar: user.avatar,
      })
  }
  } catch (error) {
    throw new Error("Internal server error")
  }
})


const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if (email.length < 2) {
        res.status(400);
        throw new Error('Enter email')
    }

    if (password.length < 2) {
        res.status(400);
        throw new Error('Enter password')
    }

    const user = await User.findOne({ email });


    if( user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
          _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phone: user.phone,
            gender: user.gender,
            state: user.state,
            city: user.city,
            address: user.address,
            avatar: user.avatar,
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }

});



const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id).select('-password');
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id);
  
    if (user) {
      user.fullname = req.body.fullname || user.fullname;
      user.homeAddress = req.body.homeAddress || user.homeAddress;
      user.gender = req.body.gender || user.gender;
      user.phone = req.body.phone || user.phone;
      user.businessname = req.body.businessname || user.businessname;
      user.email = req.body.email || user.email;
      user.avatar = req.file?.path || user.avatar;
      user.state = req.body.state || user.state;
      user.city = req.body.city || user.city;
      user.address = req.body.address || user.address;
      user.pincode = req.body.pincode || user.pincode;
      user.since = req.body.since || user.since;
      user.about = req.body.about || user.about;
      user.description = req.body.description || user.description;
      user.phonenumber = req.body.phonenumber || user.phonenumber;
      user.instagram = req.body.instagram || user.instagram;
      user.facebook = req.body.facebook || user.facebook;
      user.map = req.body.map || user.map;
      
      // if (req.body.password) {
      //   user.password = req.body.password;
      // }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        homeAddress: updatedUser.homeAddress,
        gender: updatedUser.gender,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        businessname: updatedUser.businessname,
        email: updatedUser.email,
        state: updatedUser.state,
        city: updatedUser.city,
        address: updatedUser.address,
        since: updatedUser.since,
        pincode: updatedUser.pincode,
        about: updatedUser.about,
        description: updatedUser.description,
        phonenumber: updatedUser.phonenumber,
        instagram: updatedUser.instagram,
        facebook: updatedUser.facebook,
        map: updatedUser.map,
        role: user.role,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };


const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}, 'businessname _id city images avatar phonenumber role ')
    res.json(user)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

const getAppointments = async (req, res) => {
  try {
      const id = req.params.id; // Use req.params.id to get the user ID from the route parameters
      const user = await User.findById(id).populate({
        path: 'appointments',
        populate: { 
          path: 'doctor', 
          select: 'fullname avatar address' // Select the fields you want to populate
        }
      });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.json(user.appointments);
  } catch (error) {
      console.error("Error fetching appointment details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};





export {registerUser, loginUser, googleReg, googleLogin, logoutUser, getUserProfile, getAppointments}