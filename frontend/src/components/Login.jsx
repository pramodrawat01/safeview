import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setRole } from '../redux/authSlice'

const Login = () => {
    const [user, setUser] = useState({
        
        password : '',
        userName : ''
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogin = async()=>{
        if(!user.userName || !user.password){
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
                
                if (data.role === "parent") {
                    navigate("/parent_dashboard");
                } else {
                    navigate("/child_dashboard");
                }

            }


        } catch (error) {
           console.log("error in login request", error) 
        }


    }
  return (
    


    <div className=" mt-6 flex flex-col items-center justify-center bg-white text-black px-4">
  
  <p className="text-2xl font-bold mb-6">Login page</p>

  <div className="w-full max-w-sm space-y-4 border p-6 rounded-md shadow-sm">

    <input
      className="border w-full p-2 rounded-md outline-none focus:border-black"
      onChange={(e)=> setUser({ ...user, userName: e.target.value })}
      type="text"
      placeholder="enter userName here"
    />

    <input
      className="border w-full p-2 rounded-md outline-none focus:border-black"
      onChange={(e)=> setUser({ ...user, password: e.target.value })}
      type="password"
      placeholder="enter password"
    />

    <button
      onClick={()=> handleLogin()}
      className="w-full border border-black py-2 rounded-md font-semibold hover:bg-black hover:text-white transition"
    >
      login
    </button>

  </div>

</div>

  )
}

export default Login