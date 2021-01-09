import { Router } from "express";

import { isLoggedIn, isNotLoggedIn } from "../middlewares/checkLogin";
import { errorHandler } from "../middlewares/errorHadler";
import { BusinessLogic } from "../types/BusinessLogic";
import * as authController from "../controllers/authController";

const router: Router = Router();

const joinUserHandler: BusinessLogic = errorHandler(authController.joinUser);
const loginUserHandler: BusinessLogic = errorHandler(authController.loginUserWithPassport);
const logoutUserHandler: BusinessLogic = errorHandler(authController.logoutUser);

router.post("/join", isNotLoggedIn, joinUserHandler);
router.post("/login", isNotLoggedIn, loginUserHandler);
router.get("/logout", isLoggedIn, logoutUserHandler);

export default router;