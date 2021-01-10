import { NextFunction, Request, Response } from "express";

interface RequestUser extends Express.User {
  [key: string]: any;
}

interface CustomRequest extends Request {
  user?: RequestUser;
  [key: string]: any;
}

interface CustomResponse extends Response {
  [key: string]: any;
}

type BusinessLogic = (req: CustomRequest, res: CustomResponse, next: NextFunction) => any;

export {
  CustomRequest,
  CustomResponse,
  NextFunction,
  BusinessLogic,
}