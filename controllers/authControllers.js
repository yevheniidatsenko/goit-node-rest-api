import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const { email, subscription } = await authServices.registerUser(req.body);

  res.status(201).json({
    message: `User ${email} registered successfully!`,
    data: {
      email,
      subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  res.status(200).json({
    message: `The user ${user.email} was logged in!`,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logoutController = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { id, email } = req.user;
  await authServices.logoutUser(id);

  res.status(200).json({
    message: `The user ${email} was logged out!`,
    data: {
      email,
    },
  });
};

const getCurrentController = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    message: "Current user data retrieved successfully",
    data: {
      email,
      subscription,
    },
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
};
