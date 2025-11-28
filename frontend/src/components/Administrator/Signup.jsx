import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const [user, setUser] = useState({
        userName : '',
        password : '',
    })
    const [error, setError] = useState('')

    const role = useSelector(state => state.auth.role || JSON.parse(localStorage.getItem('Role')))

    const navigate = useNavigate()

    
    const checkStrongPass = ()=>{

    }

    const handleSignup = async()=>{
        if(!user.userName || !user.password ){
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
               return console.log(data.message)
            }

            if(res.status === 409){
                console.log(data.message)
                return toast.error('user already exist, choose different name')
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


    if(role === 'kid'){
        return <div>u are not permited to signup</div>
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">

    <div className="text-2xl font-bold mb-6">Signup here</div>
    <p>create a new Administrator account</p>

    <div className="w-full max-w-sm space-y-4 border p-6 rounded-md shadow-sm">

        <input
        onChange={(e) => {
            setUser({ ...user, userName: e.target.value })
        }}
        type="text"
        placeholder="username"
        className="border w-full p-2 rounded-md outline-none focus:border-black"
        />

        <input
        onChange={(e) => {
            setUser({ ...user, password: e.target.value })
        }}
        type="password"
        placeholder="enter password"
        className="border w-full p-2 rounded-md outline-none focus:border-black"
        />

        <button
        onClick={() => handleSignup()}
        className="w-full border border-black py-2 rounded-md font-semibold hover:bg-black hover:text-white transition"
        >
        signup
        </button>

    </div>
    </div>

  )
}

export default Signup