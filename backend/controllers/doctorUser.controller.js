import asyncHandler from 'express-async-handler'
import { Doctor } from '../models/DoctorSchema.js'
import generateToken from '../utils/generateToken.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { Hospital } from '../models/HospitalSchema.js';

const registerDocUser = asyncHandler(async (req, res) => {
    const { fullname, email, id, password, hospitalname, city, state, address, map, pincode, specialization } = req.body;
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

    const userExists = await Doctor.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exist by this email id')
    }

    const user = await Doctor.create({
        fullname,
        email,
        password,
        hospitalname,
        city,
        state, 
        address,
        map,
        specialization,
        pincode
    })


    if (user) {
      const hospital = await Hospital.findOne({ _id : id});
      if (hospital) {
        // Push the user's _id to the doctor array of the hospital
        hospital.doctors.push(user._id);
        await hospital.save();
    } else {
        res.status(400);
        throw new Error('Hospital not found');
    }
        res.status(200).json({
            // _id: user._id,
            // fullname: user.fullname,
            // email: user.email,
            // hospitalname: user.hospitalname,
            // state: user.state,
            // city: user.city,
            // address: user.address,
            // pincode: user.pincode,
            // map: user.map,
            // role: user.role  
            message : "Docter Created "
        })
    }else{
        res.status(401);
        throw new Error('Some thing went wrong')
    }
});

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

    const user = await Doctor.findOne({ email });


    if( user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json(user);
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }

});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await Doctor.findById(req.user._id).select('-password');
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Doctor.findByIdAndUpdate(req.user._id);
  
    if (user) {
      user.fullname = req.body.fullname || user.fullname;
      user.homeAddress = req.body.homeAddress || user.homeAddress;
      user.gender = req.body.gender || user.gender;
      user.phone = req.body.phone || user.phone;
      user.businessname = req.body.businessname || user.businessname;
      user.email = req.body.email || user.email;
      user.fee = req.body.fee || user.fee;
      user.feeType = req.body.feeType || user.feeType;
      user.experience = req.body.experience || user.experience;
      user.specialization = req.body.specialization || user.specialization;
      user.about = req.body.about || user.about;
      user.age = req.body.age || user.age;
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
        businessname: updatedUser.businessname,
        email: updatedUser.email,
        state: updatedUser.state,
        city: updatedUser.city,
        address: updatedUser.address,
        fee: updatedUser.fee,
        feeType: updatedUser.feeType,
        experience: updatedUser.experience,
        specialization: updatedUser.specialization,
        pincode: updatedUser.pincode,
        about: updatedUser.about,
        age: updatedUser.age,
        phonenumber: updatedUser.phonenumber,
        instagram: updatedUser.instagram,
        facebook: updatedUser.facebook,
        map: updatedUser.map,
        role: updatedUser.role
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path
  
    if (!avatarLocalPath) {
        throw new Error("Avatar file is missing")
    }
  
    //TODO: delete old image - assignment
  
    const avatar = await uploadOnCloudinary(avatarLocalPath)
  
    if (!avatar.url) {
        throw new Error("Error while uploading on avatar")
        
    }
  
    const user = await Doctor.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")
  
    return res
    .status(200)
    .json(user
    )
  })

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };


const getAllUsers = async (req, res) => {
  try {
    const user = await Doctor.find({}, 'hospitalname fullname _id state city avatar phone feeType fee role instagram map specialization')
    res.json(user)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

const get5 = async (req, res) => {
  try {
    const users = await Doctor.find({}, 'hospitalname fullname _id state city avatar phone feeType fee role instagram map specialization').limit(6);
    res.json(users);
  } catch (error) {
    throw new Error('Something went wrong');
  }
}


const getRegCity = async (req, res) => {
  try {
    const city = await Doctor.distinct('city')
    res.json(city)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

const getDocByCity = asyncHandler(async (req, res) => {
  const { city } = req.query;
  try {
    const doctors = await Doctor.find({ city: city });
    res.json(doctors);
  } catch (error) {
    throw new Error("Internal error")
  }
})

const getDocById = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      throw new Error("Doctor not found")
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw new Error("some error occured " + error.message)
  }
})



const searchDoc = asyncHandler(async (req, res) => {
  const { city, search } = req.query;
  try {
    let query = {};

    // If both city and search query are provided
    if (city && search) {
      query = {
        city: city,
        fullname: { $regex: search, $options: "i" }
      };
    } else if (city) { // If only city is provided
      query.city = city;
    } else if (search) { // If only search query is provided
      query.fullname = { $regex: search, $options: "i" };
      query.specialization = { $regex: search, $options: "i" };

    }

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    throw new Error("Internal error");
  }
});

const getDocAppointments = async (req, res) => {

  try {
      const id = req.user._id; // Use req.params.id to get the user ID from the route parameters
      if (!req.user || !req.user._id) {
        return res.status(400).json({ error: "User ID is missing or invalid" });
      }
      console.log(id)
      const user = await Doctor.findById(id).populate({
        path: 'appointments',
        populate: { 
          path: 'user', 
          select: 'fullname avatar city' // Select the fields you want to populate
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


const suggestDocSecialization = async (req, res) => { 
  try {
    const doctors = await Doctor.find({
      specialization: req.params.specialization,
      _id: { $ne: req.params.currentDoctorId } // Exclude current doctor's ID
    }).limit(6);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const test = (req, res) => {
  res.json({ message: 'Tested' });
}

export { registerDocUser, loginUser, logoutUser, getUserProfile, updateUserProfile, updateUserAvatar , getAllUsers, getRegCity, getDocByCity, getDocById,
  searchDoc, getDocAppointments, test, get5, suggestDocSecialization,
}
