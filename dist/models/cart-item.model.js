"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippingTypes = void 0;
const mongoose_1 = require("mongoose");
exports.shippingTypes = [
    {
        id: 1,
        date: Date.now() + 1000 * 60 * 60 * 24 * 10,
        name: "Free Shipping",
        price: 0,
    },
    {
        id: 2,
        date: Date.now() + 1000 * 60 * 60 * 24 * 6,
        name: "$4.99 - Shipping",
        price: 499,
    },
    {
        id: 3,
        date: Date.now() + 1000 * 60 * 60 * 24 * 1,
        name: "$9.99 - Shipping",
        price: 999,
    },
];
const cartItemSchema = new mongoose_1.Schema({
    cart: {
        type: mongoose_1.Types.ObjectId,
        ref: "Cart",
    },
    product: { type: mongoose_1.Types.ObjectId, ref: "Product" },
    quantity: Number,
    deliveryOption: {
        type: Number,
        enum: exports.shippingTypes.map((s) => s.id),
        default: exports.shippingTypes[0].id,
    },
}, { timestamps: true });
const CartItem = (0, mongoose_1.model)("CartItem", cartItemSchema);
exports.default = CartItem;
