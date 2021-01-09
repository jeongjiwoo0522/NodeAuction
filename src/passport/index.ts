import passport from "passport";
import jwt from "jsonwebtoken";
import { localStrategy } from "./localStrategy";
import { User } from "../models";
import { UserQuery } from "../repositorys";

interface PassportUser extends Express.User {
  [key: string]: any;
}

// serialize: token, deserialize: User 
type Callback = (err: Error | null, tokenOrUser?: string | User) => void;

const passportConfig = () => {
  passport.serializeUser((user: PassportUser, callback: Callback) => {
    const token: string = jwt.sign({
      user_id: user.id,
    }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    callback(null, token);
  });
  passport.deserializeUser(async (token: string, callback: Callback) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { user_id: number };
      const user: User = await UserQuery.findById(decoded.user_id);
      callback(null, user);
    } catch(err) {
      console.error(err);
      callback(err);
    }
  })
}

export { passportConfig }