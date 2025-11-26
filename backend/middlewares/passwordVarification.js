import validator from 'validator'
import Parent from '../models/parent.js'
import bcrypt from 'bcrypt'

export const verifyPassword = async(req, res, next)=>{

    const { email, password} = req.body 

    if(!email || !password){
            const err = new Error("Fill all details first to login")
            err.statusCode = 400
            throw err
        }
    
    if(!validator.isEmail(email)){
        const err = new Error("Invalid email, it must be in correct format!")
        err.statusCode = 400
        throw err
    }


    const user = await Parent.findOne({email})

    if(!user){
        const err = new Error("invalid credintials")
        err.statusCode = 401
        throw err
    }

    try {

        let hashedPassword = user.password
        const isVerified = await bcrypt.compare(password, hashedPassword)

        if(isVerified){
            req.body.user=user
            next()
        }
        else{
            const err = new Error("invalid credintials")
            err.statusCode = 401
            throw err
        }

        
    } catch (error) {
        const err = new Error( error.message)
        err.statusCode = 400
        throw err
    }
    


    
}