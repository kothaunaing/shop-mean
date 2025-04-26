import { Router } from "express";
import {
  checkAuth,
  loginController,
  logoutController,
  registerController,
} from "../controller/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/check-auth", verifyToken, checkAuth);

router.post("/logout", logoutController);

export default router;
