import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  shortenUrl,
  getUrls,
  redirectUrl,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/api/urls/shorten", isAuthenticated, shortenUrl);
router.get("/api/urls", isAuthenticated, getUrls);
router.get("/:shortUrl", redirectUrl);

export default router;
