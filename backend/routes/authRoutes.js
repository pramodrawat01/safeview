import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { verifyPassword } from "../middlewares/passwordVarification.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRoutes = Router()

authRoutes.post('/signup', signup)

authRoutes.post('/login', verifyPassword,  login)
authRoutes.delete('/logout', logout )

export default authRoutes