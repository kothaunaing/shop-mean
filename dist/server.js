"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const connectDB_1 = require("./db/connectDB");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", index_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    (0, connectDB_1.connectDB)();
    console.log(`Server is running at http://localhost:${PORT}`);
});
