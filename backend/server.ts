import { configDotenv } from "dotenv";
import express from "express";
import allRoutes from "./routes/index";
import { connectDB } from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { Socket } from "socket.io";
import registerSocketHandlers from "./socket";
import { app, io, server } from "./lib/socket";

configDotenv();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:4200", "http://192.168.205.44:4200"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", allRoutes);

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
