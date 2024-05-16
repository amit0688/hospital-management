import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { getAppointments, googleLogin, googleReg, loginUser, logoutUser, registerUser } from "../controllers/patientUser.controller.js";
import { protectUser } from "../middlewares/protectUser.js";


const router = Router()


router.route("/signup").post(upload.single("avatar"), registerUser)
router.route("/google-signup").post(googleReg)
router.route("/google-login").post(googleLogin)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/:id/appointments").get(protectUser, getAppointments)


export default router;