import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {


    const [isAuth, setIsAuth] = useState(null);

    console.log("reached to protected route")
    useEffect(()=>{

        const checkAuth = async()=>{
            try {
                const res = await fetch('http://localhost:3000/api/v1/auth/verify', {
                    method : 'GET',
                    credentials : 'include'
                })
                
                if(res.ok){
                    setIsAuth(true)
                }
                else{
                    setIsAuth(false)
                }


            } catch (error) {
                setIsAuth(false)
            }
        }


        checkAuth()
    }, [])

    if(isAuth === null){
         return <div>Checking authentication...</div>;
    }

    if(!isAuth){
        return <Navigate to='/login' replace />
    }
    
    return children
}

export default ProtectedRoute