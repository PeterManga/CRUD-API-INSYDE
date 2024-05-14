import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import notificationReducer from "./notificacionSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        notificacion: notificationReducer,
    }
}) 