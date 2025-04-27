import fs from "node:fs/promises";
import path from "node:path";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
} from "../services/authServices.js";

export const registerController = ctrlWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = await registerUser(req.body);

  res.status(201).json({
    message: "Registration successful",
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
});

export const loginController = ctrlWrapper(async (req, res) => {
  const { token, user } = await loginUser(req.body);

  res.json({
    message: "Login successful",
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
});

export const logoutController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  await logoutUser(id);

  res.status(200).json({
    // Changed from 204 to 200 to allow message
    message: "Logout successful",
  });
});

export const getCurrentController = ctrlWrapper((req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    message: "Current user retrieved successfully",
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
});

export const updateAvatar = ctrlWrapper(async (req, res) => {
  if (!req.user) {
    throw HttpError(401, "Not authorized");
  }

  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { id, avatarURL: oldAvatarURL } = req.user;
  const { path: tempPath, originalname } = req.file;

  // Generate filename
  const ext = path.extname(originalname);
  const filename = `${id}_${Date.now()}${ext}`;
  const avatarsDir = path.resolve("public", "avatars");
  const finalPath = path.join(avatarsDir, filename);

  // Move file directly
  await fs.rename(tempPath, finalPath);

  // Delete old avatar if exists
  if (oldAvatarURL) {
    const oldFilename = path.basename(oldAvatarURL);
    const oldPath = path.join(avatarsDir, oldFilename);
    await fs.unlink(oldPath).catch(() => {});
  }

  const newAvatarURL = `/avatars/${filename}`;
  await updateUserAvatar(id, { avatarURL: newAvatarURL });

  res.status(200).json({
    message: "Avatar updated successfully",
    avatarURL: newAvatarURL,
  });
});
