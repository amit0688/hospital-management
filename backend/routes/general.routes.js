import { Router } from "express";
import { getCity, getState } from "../controllers/general.controller.js";
import { getRegCity } from "../controllers/doctorUser.controller.js";
import { getHosRegCity } from "../controllers/hospitalUser.controller.js";

const router = Router()

router.route("/city").get(getCity)
router.route("/docregcity").get(getRegCity)
router.route("/hosregcity").get(getHosRegCity)
router.route("/state").get(getState)


export default router;
