import { model, Schema, Types } from "mongoose";

export const shippingTypes = [
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

const cartItemSchema = new Schema(
  {
    cart: {
      type: Types.ObjectId,
      ref: "Cart",
    },
    product: { type: Types.ObjectId, ref: "Product" },
    quantity: Number,
    deliveryOption: {
      type: Number,
      enum: shippingTypes.map((s) => s.id),
      default: shippingTypes[0].id,
    },
  },
  { timestamps: true }
);

const CartItem = model("CartItem", cartItemSchema);

export default CartItem;
