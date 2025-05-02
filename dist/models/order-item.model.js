"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    order: {
        type: mongoose_1.Types.ObjectId,
        ref: "Order",
    },
    product: {
        type: mongoose_1.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number,
    unitPrice: Number,
}, { timestamps: true });
const OrderItem = (0, mongoose_1.model)("orderItem", orderItemSchema);
exports.default = OrderItem;
