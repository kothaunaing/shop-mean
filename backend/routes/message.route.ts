import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getAllMessages, sendMessage } from "../controller/message.controller";

const router = Router();

router.get("/get-all", verifyToken, getAllMessages);

router.post("/send", verifyToken, sendMessage);

export default router;
