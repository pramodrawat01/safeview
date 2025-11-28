import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createChild, getAllChilds, updateChild } from "../controllers/parentController.js";

const parentRoutes = Router()


parentRoutes.post('/create_child', authMiddleware, createChild )
parentRoutes.get('/get_all_childs', authMiddleware, getAllChilds)

parentRoutes.post('/update_child', authMiddleware, updateChild)

export default parentRoutes