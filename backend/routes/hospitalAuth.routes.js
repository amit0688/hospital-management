import { Router } from "express";
import { deleteDoctor, getAllDoctors, getAllUsers, getCity, getHos5, getHosByCity, getHosById, getUserProfile, loginUser, logoutUser, registerUser, searchHos, updateUserAvatar, updateUserImages, updateUserProfile } from "../controllers/hospitalUser.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {protect, verifyHos} from "../middlewares/protect.js"


const router = Router()


// router.route("/").get(test)
router.route("/signup").post(upload.single("avatar"), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/profile/:id").get(getUserProfile)
router.route("/getallusers").get(getAllUsers)
router.route("/get5").get(getHos5)
router.route("/getcity").get(getCity)
router.route("/city").get(getHosByCity)
router.route("/search").get(searchHos)
router.route("/doctors").get(protect,verifyHos, getAllDoctors)
router.route("/:id").get(getHosById).delete(protect, verifyHos, deleteDoctor)
// router.route("/:id/doctors").get(getAllDoctors)
router.route("/update-avatar").put(protect,upload.single("avatar"), updateUserAvatar)
router.route("/update-images").put(protect,upload.array("images", 6), updateUserImages)

export default router;