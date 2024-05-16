import { Router } from "express";
import { checkout, paymentVerification } from "../controllers/booking.controller.js";


const router = Router()


// router.route("/").post(createAppointment)
router.route("/checkout").post(checkout)
router.route("/paymentverification").post(paymentVerification);



export default router;