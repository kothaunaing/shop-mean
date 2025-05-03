import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./product.route";
import cartRoutes from "./cart.route";
import userRoutes from "./user.route";
import messageRoutes from "./message.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);

export default router;
