import validator from 'validator'
import Parent from '../models/parent.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async( req, res)=>{
    const {userName, password} = req.body

    // const accessId = req.user.id 

    // if(!accessId){
    //     const err = new Error("not autenticated! login first")
    //     err.statusCode = 401
    //     throw err
    // }

    // const checkParent = await Parent.findById(accessId) 

    //  if(!checkParent){
    //     const err = new Error("parent account not found, signup first")
    //     err.statusCode = 404
    //     throw err
    // }
    // console.log(checkParent, "this is allowed parent")


    if(!userName || !password){
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


    // check - does userName already exist -----
    const existingUser = await Parent.findOne({userName})
    if(existingUser){
        const err = new Error("userName already registered, enter another username!")
        err.statusCode = 409
        throw err
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10)

    const parent = new Parent({
        userName, 
        password : hashedPassword,
    })

    await parent.save()

    res.status(201).json({
        success : true,
        message : "Parent registered successfully",
        
    })

 }

export const login = async( req, res)=>{

    try {
        const {user} = req.body
    
        let token = await jwt.sign({id : user._id, role : user.role}, process.env.secret_key, {
            expiresIn : "7d"
        })

        res.cookie('token', token)
        .status(200)
        .json({
            message : `${user.role} login successfull`,
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


export const verify = async(req, res)=>{

    const user= req.user

    if(user){
        res.status(200).json({
            message : "user authenticated",
            role : user.role
        })
    }
    else{
        const err = new Error("user not authenticated, login first !")
        err.statusCode = 401
        throw err
    }


}
