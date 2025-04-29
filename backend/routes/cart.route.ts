import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  addToCart,
  countAllCartItems,
  getAllCartItems,
} from "../controller/cart.controller";

const router = Router();

router.post("/add", verifyToken, addToCart);
router.get("/get-all", verifyToken, getAllCartItems);
router.get("/count", verifyToken, countAllCartItems);

export default router;
