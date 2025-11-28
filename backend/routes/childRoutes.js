import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAccessedVideos } from "../controllers/childController.js";

const childRoutes = Router()

childRoutes.get('/get_videos', authMiddleware, getAccessedVideos  )

export default childRoutes