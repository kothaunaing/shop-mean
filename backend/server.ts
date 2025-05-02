import { configDotenv } from "dotenv";
import express from "express";
import allRoutes from "./routes/index";
import { connectDB } from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";
import { Server, Socket } from "socket.io";
import registerSocketHandlers from "./socket";

configDotenv();

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:4200", "http://192.168.205.44:4200"] },
});

app.use(
  cors({
    origin: ["http://localhost:4200", "http://192.168.205.44:4200"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", allRoutes);
app.use(
  express.static(path.join(__dirname, "../frontend/dist/frontend/browser"))
);

// if (process.env.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../frontend/dist/frontend/broswer/index.html")
//     );
//   });
// }

io.on("connection", (socket: Socket) => {
  console.log("New client connected: " + socket.id);
  registerSocketHandlers(io, socket);
});

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Server is running" });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
