import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { logout } from '../../redux/authSlice'

const ParentDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    userName : "",
    password : "",
    categories : []
  })

  const [updateChild, setUpdateChild] = useState({
    userName : '',
    categories : []
  })

  const [showControle, setShowControle] = useState(false)

  const [childs, setChilds] = useState([])

  const getAllChilds = async()=>{
    try {
      const res = await fetch('http://localhost:3000/api/v1/parent/get_all_childs', {
        method : 'GET',
        credentials : 'include'
      })

      const data = await res.json()
      console.log(data, "all kids data")

      if(res.status === 200){
        console.log("fetch all childs")
        // set the state with response data   
        setChilds(data?.kids)
      }
    } catch (error) {
      console.log('error in fetching all the childs, ', error)
    }
  }
  useEffect(()=>{

    getAllChilds()
  }, [])

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
        toast.success(data.message)
        dispatch(
          logout()
        )
        localStorage.clear('Role')
        navigate('/login')
      }

    } catch (error) {
        console.log("error in logout", error)
    }
  }

  const handleCreateChild = async()=>{
    if(!user.userName || !user.password){
     return toast.error('enter the detail first to create new child')
    }

    // check valid userNam and strong password here 
    // although backend is verifying but sill ...

    console.log(user, 'child is about to create')
    try {
      const res = await fetch('http://localhost:3000/api/v1/parent/create_child', {
        method : "POST",
        headers : {
          "Content-Type" : "Application/json",
        },
        credentials : 'include',
        body : JSON.stringify(user)
      })

      const data = await res.json()

      if(res.status === 400){
        console.log(data.message, "error in create - child function")
        return toast.error(data.message)
      }

      if(res.status === 201){
        console.log("child created successfully")
        toast.success(data.message)

        getAllChilds()

        setUser( {
          userName : '',
          password : '',
          categories : []
        })
        return
      }




    } catch (error) {
      console.log("error in creating child ", error)
    }

    
  }


  const handleupdateChildCategoryChange = async(e)=>{
    const {value, checked} = e.target

    if(checked){
      setUpdateChild( prev => ({
        ...prev, 
        categories : [...prev.categories, value]
      }))
    }

    else{
      setUpdateChild( prev => ({
        ...prev, 
        categories : prev.categories.filter( category => category !== value )
      }))
    }
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


  const handleUpdateChild = async()=>{
    if(!updateChild.categories.length > 0){
      return toast.error('select at least category to update')
    }

    console.log(updateChild , "update this child data ")

    try {
      const res = await fetch('http://localhost:3000/api/v1/parent/update_child', {
        method : 'POST',
        headers : {
          "Content-Type" : "Application/json",
        },
        credentials : 'include',
        body : JSON.stringify(updateChild)
      })

      const data = await res.json()


      if(res.status === 400){
        return toast.error(data.message)
      }
      if(res.status === 200){
        toast.success(data.message)
        getAllChilds()
        setShowControle(null)
        return
      }


    } catch (error) {
      
    }


  }

  return (
    

    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ParentDashboard</h1>
        <button onClick={() => handleLogout()} className="border border-black px-4 py-1 rounded-md hover:bg-black hover:text-white transition">
          logout
        </button>
      </div>

      
      <div className="mb-10">
        <p className="font-semibold mb-2">Manage all childs :-</p>

        {childs && childs?.length > 0 ? (
          <div className="space-y-6">
            {childs?.map(child => (
              <div key={child?._id} className="border p-4 rounded-md">
                <h3 className="font-bold">{child?.userName}</h3>

                <ul className="my-2 list-disc ml-6">
                  {child?.allowedCategories?.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (showControle === child._id) {
                      setShowControle(null)
                      setUpdateChild({ userName: '', categories: [] })
                    
                    } else {
                      setShowControle(child._id)
                      setUpdateChild({
                        userName: child.userName,
                        categories: [...child.allowedCategories]
                      })
                    }
                  }}
                  className="border border-black px-3 py-1 rounded-md text-sm hover:bg-black hover:text-white transition"
                >
                  {showControle === child._id ? "hide controle" : "access controle"}
                </button>

                {showControle === child._id && (
                  <div className="mt-4 border-t pt-4">
                    <p>controle the <span className="font-semibold">{child.userName}</span> access here!</p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {categoryList?.map(category => {
                        const Id = category.toUpperCase().replace(/\s+/g, '-')

                        return (
                          <div key={category} className="flex gap-2 items-center">
                            <input
                              id={Id}
                              type='checkbox'
                              value={category}
                              onChange={handleupdateChildCategoryChange}
                              checked={updateChild.categories.includes(category)}
                            />
                            <label htmlFor={Id}>{category}</label>
                          </div>
                        )
                      })}
                    </div>

                    <button onClick={() => handleUpdateChild()} className="border border-black px-4 py-1 rounded-md mt-3 hover:bg-black hover:text-white transition">
                      update
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">no child creaded yet ...</div>
        )}
      </div>

      <div className="border p-5 rounded-md">
        <h2 className="font-bold text-lg mb-3">create new account for child :- </h2>

        <input
          value={user.userName}
          className="border p-2 w-full mb-3 rounded-md"
          onChange={(e) => {
            setUser({ ...user, userName: e.target.value })
          }}
          type='text' placeholder='enter userName here' />

        <input
          value={user.password}
          className="border p-2 w-full mb-3 rounded-md"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value })
          }}
          type="password" placeholder='create password' />

        <div className="mb-3">
          <p className="font-medium">allow categories - </p>
          <p>default - all categories selected</p>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryList?.map(category => {
              const Id = category.toLocaleLowerCase().replace(/\s+/g, '-')
              return (
                <div key={category} className="flex items-center gap-2">
                  <input
                    id={Id}
                    type='checkbox'
                    value={category}
                    onChange={handleCategoryChange}
                    checked={user.categories.includes(category)}
                  />
                  <label htmlFor={Id} >{category}</label>
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => handleCreateChild()}
          className="border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
        >
          create child
        </button>
      </div>

    </div>
  )
}

export default ParentDashboard