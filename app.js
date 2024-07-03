import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import urlRouter from "./routes/urlRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", userRouter);
app.use(urlRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Url Shortener API",
  });
});
