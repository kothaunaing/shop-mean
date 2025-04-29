import { model, Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      totalAmount: Number,
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
