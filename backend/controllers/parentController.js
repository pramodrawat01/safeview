import validaror from 'validator'
import bcrypt from 'bcrypt'

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

export const parentDashboard = async(req, res) => {

    res.json({
        message : "u can access parent dashboard now "
    })

}

export const createChild = async(req, res)=>{
    const {email, password} = req.body 

    if(!email || !password){
        const err = new Error('fill the details first')
        err.statusCode = 400
        throw err
    }

    if(!validaror.isEmail(email)){
        const err = new Error('enter valid email ')
        err.statusCode = 400
        throw err
    }

    if(!validaror.isStrongPassword(password)){
        const err = new Error('password must be strong, include uppercase, numbers and symbles')
        err.statusCode = 400
        throw err
    }

    

}