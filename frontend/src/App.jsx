
import './App.css'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Administrator/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ParentDashboard from './components/Administrator/ParentDashboard';
import ChildDashboard from './components/Viewer/ChildDashboard';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Home from './components/Home';

function App() {

  const role = useSelector(state => state.auth.role || JSON.parse(localStorage.getItem('Role')))

  
  return (
    


    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />

      
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8 py-4">

        
        <div className="space-x-4 flex">
          <Link to="/login">
            <button className=" text-black transition px-4 py-2 rounded-md font-semibold shadow-sm">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className=" text-black transition px-4 py-2 rounded-md font-semibold shadow-sm">
              Signup
            </button>
          </Link>
        </div>

        <div>
          {
            role && role === 'parent' ? 
            <Link to='/parent_dashboard'>
              <button className=" text-black transition px-4 py-2 rounded-md font-semibold shadow-sm">
                Your dashboard
              </button>
            </Link>
            :
            (
              role === 'kid' ?

             <Link to='/child_dashboard'>
                <button className=" text-black transition px-4 py-2 rounded-md font-semibold shadow-sm">
                  Your dashboard
                </button>
             </Link>
              :
              <div>login first</div>
            )
          }
        </div>
      </nav>

      
      
      <div className=" flex justify-center items-center">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/parent_dashboard"
            element={
              <ProtectedRoute allowedRole="parent">
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/child_dashboard"
            element={
              <ProtectedRoute allowedRole="kid">
                <ChildDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

    </div>

  )
}

export default App
