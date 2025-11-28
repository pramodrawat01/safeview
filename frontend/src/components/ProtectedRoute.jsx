



import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRole } from "../redux/authSlice";

const ProtectedRoute = ({ children, allowedRole }) => {

  const dispatch = useDispatch()
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    role: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log(data, "verify res");

        setAuth({
          loading: false,
          isAuthenticated: res.ok,
          role: data.role || null,
        });
      } catch (error) {
        setAuth({
          loading: false,
          isAuthenticated: false,
          role: null,
        });
      }
    };

    checkAuth();
  }, []);

  useEffect(()=>{

    if(!auth.loading && auth.isAuthenticated){
      dispatch(setRole({
        role : auth.role
      }))
      localStorage.setItem('Role',  JSON.stringify(auth.role))

    }
    
  },[auth, dispatch])
  
  if (auth.loading) return <p>Checking authentication...</p>;
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;



  if (allowedRole && auth.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
