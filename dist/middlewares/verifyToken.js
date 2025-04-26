"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    try {
        if (!token) {
            res.status(401).json({ success: false, msg: "Unauthorized - no token" });
            return;
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (!decoded) {
            res
                .status(401)
                .json({ success: false, msg: "Unauthorized - invalid token" });
            return;
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log("Error in verify Token: " + error.message);
        res.status(500).json({ success: false, msg: "Internal server errror" });
    }
};
exports.verifyToken = verifyToken;
