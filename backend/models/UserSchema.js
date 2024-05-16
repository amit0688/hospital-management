import mongoose from "mongoose";
import bcrypt from "bcrypt"


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, },
  fullname: { type: String, required: true },
  phone: { type: Number },
  avatar: { type: String },
  role: {
    type: String,
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


UserSchema.pre('save', async function (next){
  if (!this.isModified('password')) {
      next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

export const User = mongoose.model("User", UserSchema);
