"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = addToCart;
exports.getAllCartItems = getAllCartItems;
exports.countAllCartItems = countAllCartItems;
exports.deleteCartItem = deleteCartItem;
exports.deleteAllCartItems = deleteAllCartItems;
exports.updateQuantity = updateQuantity;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const cart_item_model_1 = __importDefault(require("../models/cart-item.model"));
const ITEMS_PER_PAGE = 10;
function addToCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const { productId, quantity } = req.body;
            const quantityInt = parseInt(quantity);
            let cart = yield cart_model_1.default.findOne({ user: userId });
            if (!cart) {
                cart = yield cart_model_1.default.create({
                    user: userId,
                });
            }
            let cartItem = yield cart_item_model_1.default.findOne({
                cart: cart._id,
                product: productId,
            });
            if (cartItem) {
                cartItem.quantity += parseInt(quantity);
                yield cartItem.save();
            }
            else {
                cartItem = yield cart_item_model_1.default.create({
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
        }
        catch (error) {
            console.log("Error in addToCart: " + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function getAllCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page } = req.query;
            const userId = req.userId;
            const newPage = parseInt(page) || 1;
            const offset = (newPage - 1) * ITEMS_PER_PAGE;
            const cart = yield cart_model_1.default.findOne({ user: userId });
            if (!cart) {
                res.status(200).json({ success: true, msg: "No items in the cart" });
                return;
            }
            const cartItems = yield cart_item_model_1.default.find({ cart: cart._id })
                .sort({ createdAt: -1 })
                .skip(offset)
                .populate("product")
                .limit(ITEMS_PER_PAGE)
                .exec();
            const totalCartItems = yield cart_item_model_1.default.countDocuments({ cart: cart._id });
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
        }
        catch (error) {
            console.log("Error in getAllCartItems: " + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function countAllCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req;
            const cart = yield cart_model_1.default.findOne({ user: userId });
            if (!cart) {
                res
                    .status(200)
                    .json({ success: true, msg: "No items in the carts", count: 0 });
                return;
            }
            const items = yield cart_item_model_1.default.find({ cart: cart._id });
            const count = items.reduce((sum, item) => sum + item.quantity, 0);
            res.status(200).json({
                success: true,
                count,
                msg: `There are ${count} items in the cart`,
            });
        }
        catch (error) {
            console.log("Error in countAllCartItems: " + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function deleteCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { userId } = req;
            const cart = yield cart_model_1.default.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ success: false, msg: "No cart found" });
                return;
            }
            const deletedCartItem = yield cart_item_model_1.default.findByIdAndDelete(id);
            if (!deletedCartItem) {
                res.status(400).json({ success: false, msg: "No cart item found" });
                return;
            }
            res.status(200).json({
                success: true,
                msg: "Successfully deleted a cart item",
                deletedCartItem,
            });
        }
        catch (error) {
            console.log("Error in deleteCartItem: " + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function deleteAllCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req;
            const cart = yield cart_model_1.default.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ success: false, msg: "No cart found" });
                return;
            }
            const deletedCartItems = yield cart_item_model_1.default.deleteMany({ cart: cart._id });
            if (deletedCartItems.deletedCount === 0) {
                res.status(400).json({ success: false, msg: "No cart items deleted" });
                return;
            }
            res.status(200).json({
                success: true,
                msg: `Deleted ${deletedCartItems.deletedCount} product(s) from the cart`,
            });
        }
        catch (error) {
            console.log("Error in deleteCartItem: " + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function updateQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { newQuantity } = req.body;
            const cartItem = yield cart_item_model_1.default.findByIdAndUpdate(id, { quantity: newQuantity }, { new: true }).populate("product");
            if (!cartItem) {
                res.status(400).json({ success: false, msg: "No item found" });
                return;
            }
            res
                .status(200)
                .json({ success: true, msg: "Cart qauntity is updated", cartItem });
        }
        catch (error) {
            console.log("Error in updateQuantity: " + error.message);
        }
    });
}
