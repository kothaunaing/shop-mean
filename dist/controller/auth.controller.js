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
exports.loginController = loginController;
exports.registerController = registerController;
exports.checkAuth = checkAuth;
exports.logoutController = logoutController;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = require("bcryptjs");
const generateTokenAndSetCookie_1 = require("../utils/generateTokenAndSetCookie");
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email.trim() || !password.trim()) {
                res
                    .status(400)
                    .json({ success: false, msg: "Please fill all required fields" });
                return;
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                res.status(400).json({ success: false, msg: "Invalid credentials" });
                return;
            }
            const matchedPassword = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!matchedPassword) {
                res.status(400).json({ success: false, msg: "Invalid credentials" });
                return;
            }
            (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(user._id, res);
            res.status(200).json({
                success: false,
                msg: "Logged in successfully",
                user: {
                    username: user.username,
                    password: undefined,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        }
        catch (error) {
            console.log(`Error in loginController: ` + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            if (!username.trim() || !email.trim() || !password.trim()) {
                res
                    .status(400)
                    .json({ success: false, msg: "Please fill all required fields" });
                return;
            }
            const userAlreadyExists = yield user_model_1.default.findOne({ email });
            if (userAlreadyExists) {
                res.status(400).json({ success: false, msg: "User already exists" });
                return;
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            const verificationCode = Math.floor(Math.random() * 900000 + 100000);
            const user = new user_model_1.default({
                username,
                email,
                password: hashedPassword,
                verificationCode,
            });
            yield user.save();
            (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(user._id, res);
            res.status(201).json({
                success: true,
                msg: "Registered successfully",
                user: {
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    password: undefined,
                },
            });
        }
        catch (error) {
            console.log("Error in registerController: " + error.message);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }
    });
}
function checkAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(req.userId);
        if (!user) {
            res.status(400).json({ success: false, msg: "No user found" });
            return;
        }
        res.status(200).json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
                password: undefined,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    });
}
function logoutController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("token");
        res.status(200).json({ success: false, msg: "Logged out successfully" });
    });
}
