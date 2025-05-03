import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  updateAvatarController,
  verifyController,
  resendVerificationController,
} from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
  emailSchema,
} from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(authRegisterSchema),
  registerController
);

authRouter.get("/verify/:verificationToken", verifyController);

authRouter.post(
  "/verify",
  validateBody(emailSchema),
  resendVerificationController
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.post("/logout", authMiddleware, logoutController);

authRouter.get("/current", authMiddleware, getCurrentController);

authRouter.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  updateAvatarController
);

export default authRouter;
