import passport from "passport";
import bcrypt from "bcrypt";
import { BusinessLogic } from "../types/BusinessLogic";
import { User } from "../models";
import { UserRepository } from "../repositorys";

const joinUser: BusinessLogic = async (req, res, next) => {
  const { email, nick, password, money } = req.body as { email: string, nick: string, password: string, money: number };
  const exUser: User = await UserRepository.getQuery().findByEmail(email);
  if(exUser) {
    return res.redirect("/join?joinError=이미 가입된 이메일입니다.");
  }
  const hash = await bcrypt.hash(password, 12);
  await UserRepository.getQuery()
  .createNewUser({email, nick, password: hash, money});
  return res.redirect("/");
}

const loginUserWithPassport: BusinessLogic = async (req, res, next) => {
  passport.authenticate("local", (authError: Error | null, user?: User | null, info?: { message: string }) => {
    if(authError) {
      throw authError;
    }
    if(!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError: Error) => {
      if(loginError) {
        throw loginError;
      }
      return res.redirect("/");
    });
  })(req, res, next);
}

const logoutUser: BusinessLogic = async (req, res, next) => {
  req.logout();
  req.session.destroy(() => {});
  res.redirect("/");
}

export { joinUser, loginUserWithPassport, logoutUser }