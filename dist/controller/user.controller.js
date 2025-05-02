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
exports.getAllUsers = getAllUsers;
const user_model_1 = __importDefault(require("../models/user.model"));
const ITEMS_PER_PAGE = 10;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page } = req.query;
            const newPage = parseInt(page) || 1;
            const offset = (newPage - 1) * ITEMS_PER_PAGE;
            const users = yield user_model_1.default.find({})
                .sort({ createdAt: -1 })
                .skip(offset)
                .select("-password")
                .limit(ITEMS_PER_PAGE)
                .exec();
            const totalDocuments = yield user_model_1.default.countDocuments();
            const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);
            res.status(200).json({
                success: true,
                msg: "Successfully fetched all users",
                totalUsers: totalDocuments,
                itemsPerPage: ITEMS_PER_PAGE,
                currentPage: newPage,
                itemsInCurrentPage: users.length,
                totalPages,
                users,
            });
        }
        catch (error) {
            console.log("Error in getAllUsers: " + error);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
