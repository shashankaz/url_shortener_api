import express from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, profile);

export default router;
