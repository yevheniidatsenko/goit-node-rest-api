import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const { email, subscription } = await authServices.registerUser(req.body);

  res.status(201).json({
    message: `User ${email} registered successfully!`,
    user: {
      email,
      subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  res.status(200).json({
    message: `The user ${user.email} was logged in!`,
    token,
    user,
  });
};

const logoutController = async (req, res) => {
  const { id, email } = req.user;
  await authServices.logoutUser(id);

  res.status(200).json({
    message: `The user ${email} was logged out!`,
    user: { email },
  });
};

const getCurrentController = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
};
