import { model, Schema, Types } from "mongoose";

const cartItemSchema = new Schema(
  {
    cart: {
      type: Types.ObjectId,
      ref: "Cart",
    },
    product: { type: Types.ObjectId, ref: "Product" },
    quantity: Number,
  },
  { timestamps: true }
);

const CartItem = model("CartItem", cartItemSchema);

export default CartItem;
