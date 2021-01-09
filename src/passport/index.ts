import passport from "passport";
import jwt from "jsonwebtoken";
import { localStrategy } from "./localStrategy";
import { User } from "../models";

interface PassportUser extends Express.User {
  [key: string]: any;
}

type Callback = (err: Error | null, token: string) => void;

const passportConfig = () => {
  passport.serializeUser((user: PassportUser, callback: Callback) => {
    const token: string = jwt.sign({
      user_id: user.id,
    }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    callback(null, token);
  });
  passport.deserializeUser((token: string, callback: Callback) => {
    
  })
}