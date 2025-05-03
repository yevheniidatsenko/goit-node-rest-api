import fs from "node:fs/promises";
import path from "node:path";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
  verifyUser,
  resendVerification,
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

export const updateAvatarController = ctrlWrapper(async (req, res) => {
  if (!req.user) throw HttpError(401, "Not authorized");
  if (!req.file) throw HttpError(400, "Avatar file is required");

  const { id, avatarURL: oldAvatarURL } = req.user;
  const { path: tempPath, originalname } = req.file;

  const avatarsDir = path.resolve("public", "avatars");
  await fs.mkdir(avatarsDir, { recursive: true });

  const ext = path.extname(originalname).toLowerCase();
  const filename = `${id}_${Date.now()}${ext}`;
  const finalPath = path.join(avatarsDir, filename);

  try {
    await fs.copyFile(tempPath, finalPath);
    await fs.unlink(tempPath);

    if (oldAvatarURL) {
      const oldPath = path.join(avatarsDir, path.basename(oldAvatarURL));
      await fs.unlink(oldPath).catch(() => {});
    }

    const newAvatarURL = `/avatars/${filename}`;
    await updateUserAvatar(id, { avatarURL: newAvatarURL });

    res.json({
      avatarURL: newAvatarURL,
      message: "Avatar updated successfully",
    });
  } catch (err) {
    await fs.unlink(tempPath).catch(() => {});
    throw HttpError(500, "Avatar processing failed");
  }
});

export const verifyController = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw HttpError(400, "Verification token is required");
  }

  await verifyUser(verificationToken);

  res.status(200).json({
    message: "Verification successful",
  });
});

export const resendVerificationController = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "missing required field email");
  }

  await resendVerification(email);

  res.status(200).json({
    message: "Verification email sent",
  });
});
