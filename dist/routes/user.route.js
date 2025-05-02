"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const checkForAdmin_1 = require("../middlewares/checkForAdmin");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
router.get("/all-user", verifyToken_1.verifyToken, checkForAdmin_1.checkForAdmin, user_controller_1.getAllUsers);
exports.default = router;
