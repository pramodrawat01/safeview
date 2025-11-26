import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ParentDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email : "",
    password : "",
    categories : []
  })

  const categoryList = [
    "Sports", "Gaming", "News", "Comedy", 
    "Music", "Podcast", "Documentary", "Education"
  ];


  const handleLogout = async()=>{
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/logout',{
        method : 'DELETE',
        credentials : 'include'
      })

      const data = await res.json()
      if(res.ok){
        console.log(data.message)

        navigate('/login')
      }

    } catch (error) {
        console.log("error in logout", error)
    }
  }

  const handleCreateChild = async()=>{
    if(!user.email || !user.password){
     return toast.error('enter the detail first to create new child')
    }

    console.log(user)
  }


  const handleCategoryChange = async(e)=>{
    const {value, checked} = e.target

    if(checked){
      setUser( prev => ({
        ...prev,
        categories : [...prev.categories, value] 
      }))
    }
    else {
      setUser( prev => ({
        ...prev,
        categories : prev.categories.filter( category => category !== value)
      }))
    }
  }

  return (
    <div>ParentDashboard
    <button onClick={()=> handleLogout()}>logout</button>

    <div>
      <p>create child :- </p>

      <input
      onChange={(e)=>{
        setUser({...user, email : e.target.value})
      }} 
      type='email' placeholder='enter email here'/>

      <input 
      onChange={(e)=>{
        setUser({...user, password : e.target.value})
      }}
      type="password" placeholder='create password' />

      <div>
        <p>allow categories - </p>

        {
          categoryList?.map( category =>{
            const Id = category.toLocaleLowerCase().replace(/\s+/g, '-')
            return(
              <div key={category}>
                <input
                id={Id}
                type='checkbox'
                value={category}
                onChange={handleCategoryChange}
                checked = {user.categories.includes(category)}
                />
                <label htmlFor={Id} >{category}</label>
              </div>
            )
            
          })
        }

        {/* <input type="checkbox" id='sports'/>
        <label htmlFor="sports">Sports</label>

        <input type="checkbox" id='gaming' />
        <label htmlFor="gaming">Gaming</label>

        <input type="checkbox" id='news' />
        <label htmlFor="news">News</label>

        <input type="checkbox" id='comedy' />
        <label htmlFor="comedy">Comedy</label>

        <input type="checkbox" id='music' />
        <label htmlFor="music">Music</label>

        <input type="checkbox" id='podcast' />
        <label htmlFor="podcast">Podcast</label>

        <input type="checkbox" id='documentary' />
        <label htmlFor="documentary">Documentary</label>

        <input type="checkbox" id='education' />
        <label htmlFor="education">Education</label> */}
        
      </div>

      <button onClick={()=> handleCreateChild()}>create child</button>
    </div>
    </div>
  )
}

export default ParentDashboard