import { model, Schema, Types } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
