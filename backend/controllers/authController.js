import validator from 'validator'
import Parent from '../models/parent.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async( req, res)=>{
    const {userName, password, email} = req.body

    if(!userName || !password || !email){
        const err = new Error("Fill all details first to register")
        err.statusCode = 400
        throw err
    }

    console.log("user data in backend")

    if(!validator.isStrongPassword(password)){
        const err = new Error("Password must be strong (include uppercase, lowercase, number & special char)")
        err.statusCode = 400
        throw err
    }

    if(!validator.isEmail(email)){
        const err = new Error("Invalid email, it must be in correct format!")
        err.statusCode = 400
        throw err
    }

    
    
    // check - does email already exist -----
    const existingUser = await Parent.findOne({email})
    if(existingUser){
        const err = new Error("Email already registered, enter another email!")
        err.statusCode = 400
        throw err
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10)

    const parent = new Parent({
        userName, 
        email,
        password : hashedPassword,
    })

    await parent.save()

    res.status(201).json({
        success : true,
        message : "Parent registered successfully",
        
    })

 }

export const login = async( req, res)=>{
    const {user} = req.body
    
    try {
        let token = await jwt.sign({id : user._id, role : user.role}, process.env.secret_key, {
            expiresIn : "7d"
        })

        res.cookie('token', token)
        .status(200)
        .json({
            message : "login successfull",
            role : user.role
        })

    } catch (error) {
        const err = new Error(error.message)
        err.statusCode = 400
        throw err
    }
    



}



export const logout = async(req, res)=>{
    try {
        res.clearCookie('token')

        res.status(200).json({
            message : "logout sussessfully"
        })
    } catch (error) {
        const err = new Error(error.message || "logout error in controller")
        err.statusCode = 500
        throw err
    }
}