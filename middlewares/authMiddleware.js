import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }

  const parts = authorization.split(" ");
  if (parts.length !== 2) {
    return next(HttpError(401, "Invalid Authorization header format"));
  }

  const [bearer, token] = parts;

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer token missing"));
  }

  const { payload, error } = verifyToken(token);

  if (error) {
    return next(HttpError(401, error.message));
  }

  const user = await findUser({ id: payload.id });

  if (!user || !user.token) {
    return next(HttpError(401, "User not found or not logged in"));
  }

  req.user = user;
  next();
};

export default authMiddleware;
