import { Router } from "express";
import {
  checkAuth,
  loginController,
  registerController,
} from "../controller/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/check-auth", verifyToken, checkAuth);

export default router;
