import express from "express";
import { login, register } from "../controllers/authController";
import { getUserByName } from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login, getUserByName);

export default router;
