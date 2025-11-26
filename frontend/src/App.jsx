
import './App.css'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Administrator/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ParentDashboard from './components/Administrator/ParentDashboard';

function App() {

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      <div>
        
      <p>safeView</p>
      <Link  to='/login'>

      <button >login</button>
      </Link>
      <Link  to='/signup'>

      <button >signup</button>
      </Link>
      </div>
      <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>

        <Route path='/dashboard' element = {
          <ProtectedRoute>
            <ParentDashboard/>
          </ProtectedRoute>
        }
         />
      </Routes>
    </>
  )
}

export default App
