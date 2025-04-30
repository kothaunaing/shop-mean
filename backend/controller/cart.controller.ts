import { Response } from "express";
import { Types } from "mongoose";
import Cart from "../models/cart.model";
import { CustomRequest } from "../middlewares/verifyToken";
import CartItem from "../models/cart-item.model";
const ITEMS_PER_PAGE = 10;

interface CartType {
  productId: Types.ObjectId;
  quantity: string;
}

export async function addToCart(req: CustomRequest, res: Response) {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body as CartType;

    const quantityInt = parseInt(quantity);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
      });
    }

    let cartItem = await CartItem.findOne({
      cart: cart._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity! += parseInt(quantity);
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart: cart._id,
        product: productId,
        quantity: quantityInt,
      });
    }

    res.status(201).json({
      success: true,
      msg: "Successfully added a cart item",
      cartItem,
    });
  } catch (error: any) {
    console.log("Error in addToCart: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function getAllCartItems(req: CustomRequest, res: Response) {
  try {
    const { page } = req.query as { page: string };
    const userId = req.userId;

    const newPage = parseInt(page) || 1;
    const offset = (newPage - 1) * ITEMS_PER_PAGE;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(200).json({ success: true, msg: "No items in the cart" });
      return;
    }

    const cartItems = await CartItem.find({ cart: cart._id })
      .sort({ createdAt: -1 })
      .skip(offset)
      .populate("product")
      .limit(ITEMS_PER_PAGE)
      .exec();
    const totalCartItems = await CartItem.countDocuments({ cart: cart._id });
    const totalPages = Math.ceil(totalCartItems / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      page: newPage,
      totalPages,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: totalCartItems,
      items: cartItems.length,
      msg: "Successfully fetched all cartItems",
      cartItems,
    });
  } catch (error: any) {
    console.log("Error in getAllCartItems: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function countAllCartItems(req: CustomRequest, res: Response) {
  try {
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res
        .status(200)
        .json({ success: true, msg: "No items in the carts", count: 0 });
      return;
    }

    const items = await CartItem.find({ cart: cart._id });
    const count = items.reduce((sum, item) => sum + item.quantity!, 0);

    res.status(200).json({
      success: true,
      count,
      msg: `There are ${count} items in the cart`,
    });
  } catch (error: any) {
    console.log("Error in countAllCartItems: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function deleteCartItem(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(400).json({ success: false, msg: "No cart found" });
      return;
    }

    const deletedCartItem = await CartItem.findByIdAndDelete(id);

    if (!deletedCartItem) {
      res.status(400).json({ success: false, msg: "No cart item found" });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "Successfully deleted a cart item",
      deletedCartItem,
    });
  } catch (error: any) {
    console.log("Error in deleteCartItem: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function deleteAllCartItems(req: CustomRequest, res: Response) {
  try {
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(400).json({ success: false, msg: "No cart found" });
      return;
    }

    const deletedCartItems = await CartItem.deleteMany({ cart: cart._id });

    if (deletedCartItems.deletedCount === 0) {
      res.status(400).json({ success: false, msg: "No cart items deleted" });
      return;
    }

    res.status(200).json({
      success: true,
      msg: `Deleted ${deletedCartItems.deletedCount} product(s) from the cart`,
    });
  } catch (error: any) {
    console.log("Error in deleteCartItem: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}
