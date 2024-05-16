import mongoose from "mongoose";
import bcrypt from "bcrypt"

// Schema for Hospital
const HospitalSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    homeAddress: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    businesstype: {
        type: String,
        enum: ["hospital", "clinic"]
    },
    businessname: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    images: [{
        type: String,
    }],
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    pincode: {
        type: String,
        default: ''
    },
    since: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        default: "hospital"
    },
    createdAt: {
        type: Date,
        default: Date.now
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
    doctors: [{
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
    }]
    

},
{
    timestamps: true,
  }
);


HospitalSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


HospitalSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

export const Hospital = mongoose.model("Hospital", HospitalSchema);