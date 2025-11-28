import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth",
    initialState :{
        role : null
    },
    reducers : {
        setRole : (state, action)=>{
            state.role = action.payload.role
        },
        logout : (state, action) =>{
            state.role = null
        }
    }
})

export const {setRole, logout} = authSlice.actions
export default authSlice.reducer