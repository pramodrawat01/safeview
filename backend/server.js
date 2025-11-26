import express from 'express'
import dotenv from 'dotenv'
import connection from './db/connection.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import parentRoutes from './routes/parentRoute.js'

dotenv.config()
connection(process.env.MONGODB_URI)


const app = express()
app.use(
    cors({
        origin  : 'http://localhost:5173',
        credentials : true
    })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/auth', parentRoutes)



// global error haldler
app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log(`server started at `, process.env.PORT)
})