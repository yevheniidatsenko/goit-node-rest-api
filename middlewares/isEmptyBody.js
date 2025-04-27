import HttpError from "../helpers/HttpError.js";

const isEmptyBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(HttpError(400, "Request body is missing"));
  }
  next();
};

export default isEmptyBody;
