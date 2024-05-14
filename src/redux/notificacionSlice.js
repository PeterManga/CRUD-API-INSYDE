import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uploading: false
}
export const notificacionSlice = createSlice({
    name: "notificacion",
    initialState,
    reducers:{
        changeUploading: (state, action)=>{
            const {uploading} = action.payload
            state.uploading = uploading
        }
    }
})
export const {changeUploading} = notificacionSlice.actions
export default notificacionSlice.reducer;