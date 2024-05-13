import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uploading: false
}
export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers:{
        changeUploading: (state, action)=>{
            state.uploading = action.uploading
        }
    }
})
export const {changeUploading} = notificationSlice.actions
export default notificationSlice.reducer