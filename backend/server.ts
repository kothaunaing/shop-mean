import { configDotenv } from "dotenv";
import express from "express";
import allRoutes from "./routes/index";
import { connectDB } from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

configDotenv();

const app = express();
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
app.use(
  express.static(path.join(__dirname, "../frontend/dist/frontend/browser"))
);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/frontend/broswer/index.html")
    );
  });
}

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Server is running" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
