import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Invalid Authorization header format"));
  }

  try {
    const { payload, error } = verifyToken(token);
    if (error) throw error;

    const user = await findUser({ id: payload.id });

    if (!user || user.token !== token) {
      return next(HttpError(401, "User not found or token invalid"));
    }

    req.user = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    };

    next();
  } catch (error) {
    return next(HttpError(401, error.message || "Not authorized"));
  }
};

export default authMiddleware;
