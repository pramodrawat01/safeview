import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createChild, parentDashboard, verify } from "../controllers/parentController.js";

const parentRoutes = Router()

parentRoutes.get('/verify', authMiddleware, verify )
parentRoutes.get('/parent/dashboard', authMiddleware,  parentDashboard)

parentRoutes.post('/create_child', createChild )

export default parentRoutes