import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (data) => {
  const { email, password } = data;

  const existingUser = await findUser({ email });

  if (existingUser) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return User.create({ ...data, password: hashPassword });
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = { id: user.id, email: user.email };

  const token = generateToken(payload);

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (!user.token) {
    return;
  }

  await user.update({ token: null });
};
