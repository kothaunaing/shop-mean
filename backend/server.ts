import { configDotenv } from "dotenv";
import express from "express";
import allRoutes from "./routes/index";
import { connectDB } from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";

configDotenv();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", allRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Server is running" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
