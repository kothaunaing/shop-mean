import { model, Schema, Types } from "mongoose";

const orderItemSchema = new Schema(
  {
    order: {
      type: Types.ObjectId,
      ref: "Order",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    unitPrice: Number,
  },
  { timestamps: true }
);

const OrderItem = model("orderItem", orderItemSchema);

export default OrderItem;
