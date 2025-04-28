import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getAProduct,
  searchProducts,
  updateProduct,
} from "../controller/product.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { checkForAdmin } from "../middlewares/checkForAdmin";

const router = Router();

router.get("/get-all", verifyToken, getAllProducts);

router.get("/search", verifyToken, searchProducts);

router.get("/get/:productId", verifyToken, getAProduct);

router.post("/new", verifyToken, checkForAdmin, createNewProduct);

router.delete("/delete/:productId", verifyToken, checkForAdmin, deleteProduct);

router.put("/update/:productId", verifyToken, checkForAdmin, updateProduct);

export default router;
