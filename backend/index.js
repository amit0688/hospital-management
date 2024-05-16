import  express from "express";
import {} from 'dotenv/config'
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'


const app = express()


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))




//routes import
import hospitalRouter from './routes/hospitalAuth.routes.js'
import docRouter from './routes/doctorAuth.routes.js'
import generalRouter from './routes/general.routes.js'
import patientRouter from './routes/patientAuth.routes.js' 
import booking from './routes/booking.routes.js'


//routes declaration
app.use("/api/hospital", hospitalRouter)
app.use("/api/doctor", docRouter)
app.use("/api/user", patientRouter)
app.use("/api/get", generalRouter)
app.use("/api/booking", booking)
app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);


app.use(notFound);
app.use(errorHandler)






const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(`${process.env.DB_URI}`)
        console.log("DB is connected")
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

connectDB()

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

app.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`)
});