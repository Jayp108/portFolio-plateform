import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   CORS CONFIG (BEST PRACTICE)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =======================
   STATIC FILES
======================= */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/about", aboutRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
