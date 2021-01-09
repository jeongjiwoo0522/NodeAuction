import { BusinessLogic } from "../types/BusinessLogic";

const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      console.error(err);
      return next(err);
    }
  }
}

export { errorHandler }