import express from "express";
import { showLogin, showRegister, registerUser, loginUser, logoutUser, userPage } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/login", showLogin);
router.post("/login", loginLimiter, loginUser);
router.get("/register", showRegister);
router.post("/register", registerUser);
router.get("/user", userPage);
router.get("/logout", logoutUser);

export default router;