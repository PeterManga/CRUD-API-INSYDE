import { configureStore } from '@reduxjs/toolkit';
import notificacionReducer from './notificacionSlice';

const store = configureStore({
    reducer: {
        notificacion: notificacionReducer,
    }
});

export default store;
