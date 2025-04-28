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
    origin: ["http://localhost:4200", "http://192.168.205.44:4200"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", allRoutes);

const PORT = process.env.PORT;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist/frontend")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Server is running" });
});

// const frontendPath = path.join(__dirname, "../frontend/dist/frontend");

// app.use(express.static(frontendPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
