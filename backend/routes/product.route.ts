import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  updateProduct,
} from "../controller/product.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { checkForAdmin } from "../middlewares/checkForAdmin";

const router = Router();

router.get("/get/all", verifyToken);

router.get("/get/:productId", verifyToken);

router.post("/new", verifyToken, checkForAdmin, createNewProduct);

router.delete("/delete/:productId", verifyToken, checkForAdmin, deleteProduct);

router.put("/update/:productId", verifyToken, checkForAdmin, updateProduct);

export default router;
