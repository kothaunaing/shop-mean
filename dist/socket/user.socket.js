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
exports.userSocketHandler = userSocketHandler;
const user_model_1 = __importDefault(require("../models/user.model"));
function userSocketHandler(io, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on("user_connected", (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByIdAndUpdate(userId, {
                socketId: socket.id,
                isOnline: true,
            });
            if (!user) {
                console.log("Unknown user connected: " + socket.id);
                return;
            }
            console.log(`${user.name} is online`);
        }));
        socket.on("user_disconnected", () => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOneAndUpdate({ socketId: socket.id }, { isOnline: false }, { new: true });
            if (user === null || user === void 0 ? void 0 : user.name) {
                console.log(`${user.name} is offline`);
            }
            else {
                console.log("An unknown user is offline");
            }
        }));
        socket.on("disconnect", () => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOneAndUpdate({ socketId: socket.id }, { isOnline: false }, { new: true });
            if (user === null || user === void 0 ? void 0 : user.name) {
                console.log(`${user.name} is offline`);
            }
            else {
                console.log("An unknown user is offline");
            }
        }));
    });
}
