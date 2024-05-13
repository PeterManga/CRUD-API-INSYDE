import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "pedro",
    username: "pedroManga",
    email: "pedro@gmail.com",
    password: "pedro1"
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginUser: (state, action)=>{
            const {name, username, email, password} = action.payload; 
             state.username = username;
            state.email = email
            state.password = password
        },
        verifyLogin: (state, action)=>{
            state.email = action.payload;
            state.password = action.password
        }
    }
})

export const {loginUser, verifyLogin} = userSlice.actions
export default  userSlice.reducer;