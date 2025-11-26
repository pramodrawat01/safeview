import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [user, setUser] = useState({
        email : '',
        password : ''
    })

    const navigate = useNavigate()

    const handleLogin = async()=>{
        if(!user.email || !user.password){
            toast.error("fill all detals first to login!")
        }

        // console.log(user, "users details")

        try {
            const res = await fetch('http://localhost:3000/api/v1/auth/login', {
                method : "POST",
                headers : {
                    'Content-Type' : "Application/json"
                },
                credentials : 'include',
                body : JSON.stringify(user)

            })

            const data = await res.json()

            if(res.status === 400){
                toast.error(data.message || "err bhai")
                return
            }

            if(res.status === 200){
                console.log("logged in successfull", data)
                toast.success(data.message || "login done")

                console.log("before navigating to dashboard")
                navigate('/dashboard')

            }


        } catch (error) {
           console.log("error in login request", error) 
        }


    }
  return (
    <div>
    
    <p>Login page</p>

    <div>
        <input
        onChange={(e)=>{
            setUser({...user, email : e.target.value})
        }}
        type='email' placeholder='enter email here' />

        <input
        onChange={(e) => {
            setUser({...user, password : e.target.value})
        }} 
        type="password" placeholder='enter password' />


        <button onClick={()=>handleLogin()}>login </button>
    </div>
    
    
    </div>
  )
}

export default Login