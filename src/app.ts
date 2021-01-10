import express, { NextFunction, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import config from "./configs/config";

dotenv.config();
import { createConnection } from "typeorm";
import { connectionOptions } from "./configs/connectionOptions";
import { passportConfig } from "./passport";
import { HttpError } from "./types/HttpError";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";

const app = express();
passportConfig();
app.set("port", config.port);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
createConnection(connectionOptions)
.then(() => {
  console.log("DB connection success");
})
.catch(console.error);

const sessionMiddleware = session({
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieSecret));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: Error = new HttpError(404, `${req.method}, ${req.url} 라우터가 없습니다.`);
  next(err);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = config.nodeEnv !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log("server on ", app.get("port"));
});