import { BusinessLogic } from "../types/BusinessLogic";

const isLoggedIn: BusinessLogic = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/?loginError=로그인이 필요합니다.");
  }
}

const isNotLoggedIn: BusinessLogic = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
}

export { isLoggedIn, isNotLoggedIn }