"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewProduct = createNewProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.getAProduct = getAProduct;
exports.getAllProducts = getAllProducts;
exports.searchProducts = searchProducts;
const product_model_1 = __importDefault(require("../models/product.model"));
const ITEMS_PER_PAGE = 10;
function createNewProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, discount, image } = req.body;
            if (!name.trim() || !price.trim() || !image.trim()) {
                res
                    .status(400)
                    .json({ success: false, msg: "Please fill all required fields" });
                return;
            }
            const priceInt = parseInt(price.trim());
            const discountInt = parseInt(discount === null || discount === void 0 ? void 0 : discount.trim());
            if (isNaN(priceInt)) {
                res.status(400).json({ success: false, msg: "Price must be a number" });
                return;
            }
            if ((discount === null || discount === void 0 ? void 0 : discount.trim()) && isNaN(discountInt)) {
                res
                    .status(400)
                    .json({ success: false, msg: "Discount must be a number" });
                return;
            }
            const newProduct = new product_model_1.default({
                name: name.trim(),
                description: description === null || description === void 0 ? void 0 : description.trim(),
                price: priceInt,
                discount: discountInt | 0,
                image,
            });
            yield newProduct.save();
            res.status(201).json({
                success: true,
                product: newProduct,
                msg: "Successfully created a new product",
            });
        }
        catch (error) {
            console.log("Error in createNewProduct: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const deleteProduct = yield product_model_1.default.findByIdAndDelete(productId);
            if (!deleteProduct) {
                res.status(400).json({ success: false, msg: "Product not found" });
                return;
            }
            res.status(200).json({
                success: true,
                product: deleteProduct,
                msg: "Successfully deleted a product",
            });
        }
        catch (error) {
            console.log("Error in deleteProduct: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, discount, image } = req.body;
            const { productId } = req.params;
            // if (!name?.trim() || !price?.trim() || !image?.trim()) {
            //   res
            //     .status(400)
            //     .json({ success: false, msg: "Please fill all required fields" });
            //   return;
            // }
            const priceInt = parseInt(price.trim());
            const discountInt = parseInt(discount === null || discount === void 0 ? void 0 : discount.trim());
            if (isNaN(priceInt)) {
                res.status(400).json({ success: false, msg: "Price must be a number" });
                return;
            }
            if ((discount === null || discount === void 0 ? void 0 : discount.trim()) && isNaN(discountInt)) {
                res
                    .status(400)
                    .json({ success: false, msg: "Discount must be a number" });
                return;
            }
            const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, {
                name: name === null || name === void 0 ? void 0 : name.trim(),
                description: description === null || description === void 0 ? void 0 : description.trim(),
                price: priceInt,
                discount: discountInt | 0,
                image,
            }, { new: true });
            res.status(201).json({
                success: true,
                product: updatedProduct,
                msg: "Successfully updated a product",
            });
        }
        catch (error) {
            console.log("Error in updateProduct: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function getAProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const product = yield product_model_1.default.findById(productId);
            if (!product) {
                res.status(400).json({ success: false, msg: "No product found" });
                return;
            }
            res
                .status(200)
                .json({ success: true, msg: "Successfully fetched a product", product });
        }
        catch (error) {
            console.log("Error in getAProduct: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page } = req.query;
            const newPage = parseInt(page) || 1;
            const offset = (newPage - 1) * ITEMS_PER_PAGE;
            const products = yield product_model_1.default.find({})
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(ITEMS_PER_PAGE)
                .exec();
            const totalDocuments = yield product_model_1.default.countDocuments();
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
        }
        catch (error) {
            console.log("Error in getAllProducts: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function searchProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page, query } = req.query;
            const newPage = parseInt(page) || 1;
            const searchQuery = query || "";
            const offset = (newPage - 1) * ITEMS_PER_PAGE;
            const products = yield product_model_1.default.find({
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
            const totalDocuments = yield product_model_1.default.countDocuments({
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
        }
        catch (error) {
            console.log("Error in getAllProducts: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
