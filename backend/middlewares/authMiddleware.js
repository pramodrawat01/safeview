import jwt from 'jsonwebtoken'
import Parent from '../models/parent.js'
const authMiddleware = async(req, res, next)=>{

    try {
        const token = req.cookies?.token
        console.log("auth middleware - token : ", token ? "Exists" :  "missing")

        if(!token){ 
            console.log("token not found" )
            const err = new Error("Not authenticated - Please login first")
            err.statusCode = 401
            throw err
        }

        const decoded = jwt.verify(token, process.env.secret_key)
        console.log(" Token decoded, userId:", decoded.id);

        const user = await Parent.findById(decoded.id)

        if(!user){
            const err = new Error("user not found in auth middleware ")
            err.statusCode = 401
            throw err
        }

        console.log(" User authenticated:", user.userName);
        req.user=user;
        next()


    } catch (error) {
        const err = new Error(error.message)
        err.statusCode = 401
        throw err
    }
}


export default authMiddleware