import asyncHandler from 'express-async-handler'
import { Hospital } from '../models/HospitalSchema.js'
import generateToken from '../utils/generateToken.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { Doctor } from '../models/DoctorSchema.js'


const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password, businessname,state, city, phonenumber, gender } = req.body;
    if (fullname.length < 2) {
        res.status(400);
        throw new Error('Enter full name')
    }

    if (email.length < 2) {
        res.status(400);
        throw new Error('Enter email')
    }

    if (city.length < 2) {
        res.status(400);
        throw new Error('Enter city')
    }

    if (businessname.length < 2) {
        res.status(400);
        throw new Error('Enter businessname')
    }

    if (phonenumber.length < 2) {
        res.status(400);
        throw new Error('Enter phonenumber')
    }
    if (password.length < 2) {
        res.status(400);
        throw new Error('Enter password')
    }

    const userExists = await Hospital.findOne({ email });
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

    const user = await Hospital.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        businessname,
        state,
        city,
        phonenumber,
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
            homeAddress: user.homeAddress,
            gender: user.gender,
            password: user.password,
            businesstype: user.businesstype,
            businessname: user.businessname,
            about: user.about,
            state: user.state,
            city: user.city,
            since: user.since,
            address: user.address,
            pincode: user.pincode,
            avatar: avatar.url,
            phonenumber: user.phonenumber,
            instagram: user.instagram,
            facebook: user.facebook,
            map: user.map
            
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

    const user = await Hospital.findOne({ email });


    if( user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
          _id: user._id,
          fullname: user.fullname,
          role: user.role,
          email: user.email,
          phone: user.phone,
          homeAddress: user.homeAddress,
          gender: user.gender,
          password: user.password,
          businesstype: user.businesstype,
          businessname: user.businessname,
          about: user.about,
          state: user.state,
          city: user.city,
          since: user.since,
          address: user.address,
          pincode: user.pincode,
          avatar: user.avatar,
          phonenumber: user.phonenumber,
          instagram: user.instagram,
          facebook: user.facebook,
          map: user.map
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }

});

const getUserProfile = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.params._id)
    .select('-password')
    .populate('doctors', 'fullname specialization experience');;
  
    if (hospital) {
      res.json(hospital);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Hospital.findByIdAndUpdate(req.user._id);
  
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
    const user = await Hospital.find({}, 'businessname _id city images avatar phonenumber role ')
    res.json(user)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

const getCity = async (req, res) => {
  try {
    const city = await Hospital.distinct('city') // to make the city unique 
    res.json(city)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

const getHosRegCity = async (req, res) => {
  try {
    const city = await Hospital.distinct('city')
    res.json(city)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

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

  const user = await Hospital.findByIdAndUpdate(
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

const updateUserImages = asyncHandler(async (req, res)=> {
  const uploadedFiles = req.files;
  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new Error("Images file is missing");
  }

  const imageUrls = [];
  for (const file of uploadedFiles) {
    const uploadResponse = await uploadOnCloudinary(file.path);
    if (uploadResponse) {
      imageUrls.push(uploadResponse.url);
    }
  }

  const user = await Hospital.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        images: imageUrls
      }
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(user);
});

const getHosByCity = asyncHandler(async (req, res) => {
  const { city } = req.query;
  try {
    const hospitals = await Hospital.find({ city });
    res.json(hospitals);
  } catch (error) {
    throw new Error("Internal error")
  }
})

const getHos5 = async (req, res) => {
  try {
    const users = await Hospital.find({}, 'businessname _id city images avatar phonenumber role ').limit(6);
    res.json(users);
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

const getHosById = asyncHandler(async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id)
    .select('-password')
    .populate('doctors', 'fullname specialization experience avatar')
    if (!hospital) {
      throw new Error("Doctor not found")
    }
    res.json(hospital);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw new Error("some error occured " + error.message)
  }
})




const searchHos = asyncHandler(async (req, res) => {
  const { city, search } = req.query;
  try {
    let query = {};

    // If both city and search query are provided
    if (city && search) {
      query = {
        city: city,
        businessname: { $regex: search, $options: "i" }
      };
    } else if (city) { // If only city is provided
      query.city = city;
    } else if (search) { // If only search query is provided
      query.businessname = { $regex: search, $options: "i" };
    }

    const hospitals = await Hospital.find(query);
    res.json(hospitals);
  } catch (error) {
    throw new Error("Internal error");
  }
});


const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id
    const hospital = await Hospital.findById(id)
    .select('-password')
    .populate('doctors', 'fullname specialization email id experience avatar')
    if (!hospital) {
      throw new Error("Hospital not found")
    }
    const doctors = hospital.doctors;
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw new Error("some error occured " + error.message)
  }
  
})

const deleteDoctor = asyncHandler(async (req, res) => {
  try {
    const result = await Doctor.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});






export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile ,getHosRegCity, getAllUsers, getCity, updateUserAvatar, updateUserImages, getHosByCity, getHosById,
  searchHos, getAllDoctors, getHos5, deleteDoctor
}
