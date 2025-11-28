import { Router } from "express";
import { login, logout, signup, verify } from "../controllers/authController.js";
import { verifyPassword } from "../middlewares/passwordVarification.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRoutes = Router()

authRoutes.post('/signup', signup)

authRoutes.post('/login', verifyPassword,  login)
authRoutes.delete('/logout', logout )
authRoutes.get('/verify', authMiddleware, verify )


export default authRoutes