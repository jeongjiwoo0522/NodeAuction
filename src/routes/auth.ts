import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";

import { isLoggedIn, isNotLoggedIn } from "../middlewares/checkLogin";

const router: Router = Router();

router.post("/join", isNotLoggedIn, );
router.post("/login", isNotLoggedIn, );
router.get("/logout", isLoggedIn, );

export default router;