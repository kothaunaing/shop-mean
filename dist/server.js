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
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: ["http://localhost:4200", "http://192.168.205.44:4200"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", index_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist/frontend/browser")));
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../frontend/dist/frontend/broswer/index.html"));
    });
}
app.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Server is running" });
});
app.listen(PORT, () => {
    (0, connectDB_1.connectDB)();
    console.log(`Server is running at http://localhost:${PORT}`);
});
