import mongoose from "mongoose";
import Video from '../models/video.js'
// import Videos from '../data/videos.json' assert { type: "json" };
import dotenv from 'dotenv'
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, "../data/videos.json");
const Videos = JSON.parse(fs.readFileSync(videosPath, "utf-8"));


dotenv.config();

const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connected")

        await Video.deleteMany()
        await Video.insertMany(Videos)

        console.log("videos inserted successfully")
        process.exit()
    } catch (error) {
        console.log( 'connection error ',error)
        process.exit(1)
    }
}

connection()