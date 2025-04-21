import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authControllers.loginController
);

authRouter.post("/logout", authMiddleware, authControllers.logoutController);

authRouter.get(
  "/current",
  authMiddleware,
  authControllers.getCurrentController
);

export default authRouter;
