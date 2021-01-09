import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";  
import { User } from "../models";
import { UserRepository } from "../repositorys";

interface loginCallback { 
  (err: Error | null, user?: User | null, info?: { message: string }): void;
}

const localStrategy = () => {
  passport.use(new Strategy({
    usernameField: "email",
    passwordField: "password",
  }, async (email: string, password: string, callback: loginCallback) => {
    try {
      const exUser: User = await UserRepository.getQuery().findByEmail(email);
      if(exUser) {
        const result: boolean = await bcrypt.compare(password, exUser.password);
        if(result) {
          callback(null, exUser);
        } else {
          callback(null, null, { message: "비밀번호가 일치하지 않습니다." });
        }
      } else {
        callback(null, null, { message: "가입되지 않은 회원입니다." });
      }
    } catch(err) {
      console.error(err);
      callback(err);
    }
  }));
}

export { localStrategy }