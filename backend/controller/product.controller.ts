import { Request, Response } from "express";
import Product from "../models/product.model";
import { CustomRequest } from "../middlewares/verifyToken";

const ITEMS_PER_PAGE = 10;

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

export async function getAProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params as { productId: string };

    const product = await Product.findById(productId);

    if (!product) {
      res.status(400).json({ success: false, msg: "No product found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, msg: "Successfully fetched a product", product });
  } catch (error: any) {
    console.log("Error in getAProduct: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { page } = req.query as { page: string };

    const newPage = parseInt(page) || 1;

    const offset = (newPage - 1) * ITEMS_PER_PAGE;

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .exec();

    const totalDocuments = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      msg: "Successfully fetched all products",
      totalProducts: totalDocuments,
      itemsPerPage: ITEMS_PER_PAGE,
      currentPage: newPage,
      itemsInCurrentPage: products.length,
      totalPages,
      products,
    });
  } catch (error: any) {
    console.log("Error in getAllProducts: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function searchProducts(req: Request, res: Response) {
  try {
    const { page, query } = req.query as { page: string; query: string };

    const newPage = parseInt(page) || 1;
    const searchQuery = query || "";

    const offset = (newPage - 1) * ITEMS_PER_PAGE;

    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
          description: {
            $regex: searchQuery,
            $options: "i",
          },
        },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .exec();

    const totalDocuments = await Product.countDocuments({
      $or: [
        {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
          description: {
            $regex: searchQuery,
            $options: "i",
          },
        },
      ],
    });
    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      msg: `Successfully fetched all products with query ${searchQuery}`,
      totalProducts: totalDocuments,
      itemsPerPage: ITEMS_PER_PAGE,
      currentPage: newPage,
      itemsInCurrentPage: products.length,
      totalPages,
      products,
    });
  } catch (error: any) {
    console.log("Error in getAllProducts: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}
