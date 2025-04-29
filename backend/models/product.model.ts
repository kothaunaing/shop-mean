import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    stockQuantity: Number,
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
