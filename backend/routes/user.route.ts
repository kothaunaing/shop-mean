import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { checkForAdmin } from "../middlewares/checkForAdmin";
import { getAllUsers, getOnlineUsers } from "../controller/user.controller";

const router = Router();

router.get("/all-users", verifyToken, getAllUsers);
router.get("/online-users", verifyToken, getOnlineUsers);
export default router;
