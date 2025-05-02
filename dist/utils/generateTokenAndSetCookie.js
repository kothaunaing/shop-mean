"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTokenAndSetCookie(userId, res) {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7,
    //   sameSite: "strict",
    // });
    return token;
}
