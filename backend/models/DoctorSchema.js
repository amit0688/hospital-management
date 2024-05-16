import mongoose from "mongoose";
import bcrypt from "bcrypt"

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  age: {
    type: Number,
  },
  state: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: ''
  },
  hospitalname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dsusy7gxb/image/upload/v1715774782/z6zdhqq8qsbnqpqghv5s.jpg'
  },
  phone: { type: Number,
    default: '' },
  fee: {
    type: Number,
    default: ''
  },
  feeType: {
    type: String,
    enum: ["hour", "visit"]
  },
  experience: {
    type: Number,
    default: ''
  },
  specialization: { type: String,
    default: '' },
  qualifications: {
    type: Array,
  },

  role: {
    type: String,
    default: "doctor"
  },

  instagram: {
    type: String,
    default: ''
},
facebook: {
    type: String,
    default: ''
},

  
  map: {
    type: String,
    default: ''
  },

  about: { type: String,
  default: ''},
  timeSlots: { type: Array },


  // reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  // averageRating: {
  //   type: Number,
  //   default: 0,
  // },
  // totalRating: {
  //   type: Number,
  //   default: 0,
  // },
  // isApproved: {
  //   type: String,
  //   enum: ["pending", "approved", "cancelled"],
  //   default: "pending",
  // },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

DoctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


DoctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

export const Doctor = mongoose.model("Doctor", DoctorSchema);
