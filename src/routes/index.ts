import { Request, Response, NextFunction, Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/checkLogin";
import { upload } from "../middlewares/uploadFile";

import * as indexController from "../controllers/indexController";
import { BusinessLogic } from "../types/BusinessLogic";
import { errorHandler } from "../middlewares/errorHadler";

const router: Router = Router();

const renderMainPageHandler: BusinessLogic = errorHandler(indexController.renderMainPage);
const renderJoinPageHandler: BusinessLogic = errorHandler(indexController.renderJoinPage);
const renderGoodPageHandler: BusinessLogic = errorHandler(indexController.renderGoodPage);
const auctionGoodHandler: BusinessLogic = errorHandler(indexController.createGood);

router.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user;
  next();
}); 

router.get("/", renderMainPageHandler);
router.get("/join", isNotLoggedIn, renderJoinPageHandler);
router.get("/good", isLoggedIn, renderGoodPageHandler);
router.post("/good", isLoggedIn, upload.single("img"), auctionGoodHandler);

export default router;