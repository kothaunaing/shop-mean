import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  addToCart,
  countAllCartItems,
  deleteAllCartItems,
  deleteCartItem,
  getAllCartItems,
} from "../controller/cart.controller";

const router = Router();

router.post("/add", verifyToken, addToCart);
router.get("/get-all", verifyToken, getAllCartItems);
router.get("/count", verifyToken, countAllCartItems);
router.delete("/delete/:id", verifyToken, deleteCartItem);
router.delete("/delete-all", verifyToken, deleteAllCartItems);

export default router;
