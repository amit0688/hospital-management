import asyncHandler from 'express-async-handler'
import { Doctor } from '../models/DoctorSchema.js'
import { Hospital } from '../models/HospitalSchema.js';
import { User } from '../models/UserSchema.js'

import { Booking } from '../models/BookingSchema.js';
import { instance } from '../index.js';
import crypto from "crypto";

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order)

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error)
  }
};



const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, timeSlot, appointmentDate, fee, doctor, user } = req.body;


  console.log(req.body)
  console.log(timeSlot)


  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    try {
      const booking = await Booking.create({ timeSlot, appointmentDate, fee, doctor, user });
      if(booking){
        // push booking id into patient's booking
        const pat = await User.findById(user)
        if(pat){
          pat.appointments.push(booking._id)
          await pat.save();

        } else {
          res.status(400);
          throw new Error('Patient not found');
      }
      
        // push booking id into patient's booking
        const doc = await Doctor.findById(doctor)
        if(doc){
          doc.appointments.push(booking._id);
        await doc.save();

        } else {
          res.status(400);
          throw new Error('Doctor not found');
      }



      }
      res.status(200).json({ success: true, message: 'Booking completed', redirectUrl : `http://localhost:5000/paymentsuccess?reference=${razorpay_payment_id}` });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid payment signature' });
  }

}


export { checkout, paymentVerification }