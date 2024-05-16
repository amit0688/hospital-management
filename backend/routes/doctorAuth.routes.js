import { Router } from "express";
import { getAllUsers, getDocAppointments, getDocByCity, getDocById, loginUser, registerDocUser, searchDoc, test, updateUserAvatar, updateUserProfile } from "../controllers/doctorUser.controller.js";
import { protectDoc, verifyDoc } from "../middlewares/protectDoc.js";
import {upload} from "../middlewares/multer.middleware.js"
import {protect, verifyData, verifyHos} from "../middlewares/protect.js"

const router = Router()


router.route("/signup").post(protect, verifyHos, verifyData, registerDocUser)
router.route("/login").post(loginUser)
router.route("/getallusers").get(getAllUsers)
router.route("/profile").put(protectDoc, updateUserProfile)
router.route("/update-avatar").put(protectDoc,upload.single("avatar"), updateUserAvatar)
router.route("/city").get(getDocByCity)
router.route("/search").get(searchDoc)
router.route("/appointments").get(protectDoc, getDocAppointments )
router.route("/test").get(test)
router.route("/:id").get(getDocById);



export default router