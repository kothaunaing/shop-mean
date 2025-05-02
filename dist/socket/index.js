"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerSocketHandlers;
const user_socket_1 = require("./user.socket");
function registerSocketHandlers(io, socket) {
    // testHandler(io, socket);
    (0, user_socket_1.userSocketHandler)(io, socket);
}
