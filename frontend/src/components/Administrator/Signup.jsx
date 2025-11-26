import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const [user, setUser] = useState({
        userName : '',
        password : '',
        email : ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    
    const checkStrongPass = ()=>{

    }

    const handleSignup = async()=>{
        if(!user.userName || !user.password || !user.email){
            toast.error('add all the details first!')
        }

        console.log(user, "this is final user")

        try {
            const res = await fetch('http://localhost:3000/api/v1/auth/signup', {
                method : "POST",
                credentials : 'include',
                headers : {
                    'Content-Type' : 'Application/json'
                },
                body : JSON.stringify(user)
            })

            const data = await res.json()

            if(res.status === 400){
                console.log(data.message)
            }

            if(res.status === 201){
                console.log("signup successfull")
                console.log(`${data?.message} ${data?.role}`)

                navigate('/login')
            }
            
        } catch (error) {
            console.log("error in singup request ", error)
        }

    }


  return (
    <div>
        <div>Signup here </div>

        <div>
            <input
                onChange={(e)=> {
                    setUser({...user, userName : e.target.value})
                }}
             type='text' placeholder='username'/>

            <input
                onChange={(e)=>{
                    setUser({...user, email : e.target.value})
                }}
            type='email' placeholder='enter email'/>

            <input 
            onChange={(e)=> {
                setUser({...user, password : e.target.value})
            }}
            type='password' placeholder='enter password'/>

            

            <button onClick={()=> handleSignup() }>signup </button>
        </div>
    </div>
  )
}

export default Signup