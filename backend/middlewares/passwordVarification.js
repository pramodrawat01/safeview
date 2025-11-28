import validator from 'validator'
import Parent from '../models/parent.js'
import bcrypt from 'bcrypt'
import Kid from '../models/kid.js'

export const verifyPassword = async(req, res, next)=>{


    try {

    const { userName, password} = req.body 



    if(!password || !userName){
            const err = new Error("Fill all details first to login")
            err.statusCode = 400
            throw err
        }

    let user;

    // parent login 
    user = await Parent.findOne({userName})
    

    // kid login 
    if(!user){
        user = await Kid.findOne({userName})
    }
    


    if(!user){
        const err = new Error("invalid credintials")
        err.statusCode = 401
        throw err
    }

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