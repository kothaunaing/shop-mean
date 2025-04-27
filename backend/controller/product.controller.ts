import { Request, Response } from "express";
import Product from "../models/product.model";
import { CustomRequest } from "../middlewares/verifyToken";

interface Product {
  name: string;
  description?: string;
  price: string;
  discount?: string;
  image: string;
}

export async function createNewProduct(req: CustomRequest, res: Response) {
  try {
    const { name, description, price, discount, image } = req.body as Product;

    if (!name.trim() || !price.trim() || !image.trim()) {
      res
        .status(400)
        .json({ success: false, msg: "Please fill all required fields" });

      return;
    }

    const priceInt = parseInt(price.trim());
    const discountInt = parseInt(discount?.trim()!);

    if (isNaN(priceInt)) {
      res.status(400).json({ success: false, msg: "Price must be a number" });
      return;
    }

    if (discount?.trim() && isNaN(discountInt)) {
      res
        .status(400)
        .json({ success: false, msg: "Discount must be a number" });
      return;
    }

    const newProduct = new Product({
      name: name.trim(),
      description: description?.trim(),
      price: priceInt,
      discount: discountInt | 0,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      product: newProduct,
      msg: "Successfully created a new product",
    });
  } catch (error: any) {
    console.log("Error in createNewProduct: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params as { productId: string };

    const deleteProduct = await Product.findByIdAndDelete(productId);

    if (!deleteProduct) {
      res.status(400).json({ success: false, msg: "Product not found" });
      return;
    }

    res.status(200).json({
      success: true,
      product: deleteProduct,
      msg: "Successfully deleted a product",
    });
  } catch (error: any) {
    console.log("Error in deleteProduct: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function updateProduct(req: CustomRequest, res: Response) {
  try {
    const { name, description, price, discount, image } = req.body as Product;
    const { productId } = req.params as { productId: string };

    if (!name.trim() || !price.trim() || !image.trim()) {
      res
        .status(400)
        .json({ success: false, msg: "Please fill all required fields" });

      return;
    }

    const priceInt = parseInt(price.trim());
    const discountInt = parseInt(discount?.trim()!);

    if (isNaN(priceInt)) {
      res.status(400).json({ success: false, msg: "Price must be a number" });
      return;
    }

    if (discount?.trim() && isNaN(discountInt)) {
      res
        .status(400)
        .json({ success: false, msg: "Discount must be a number" });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: name.trim(),
        description: description?.trim(),
        price: priceInt,
        discount: discountInt | 0,
        image,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      product: updatedProduct,
      msg: "Successfully updated a product",
    });
  } catch (error: any) {
    console.log("Error in updateProduct: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}
