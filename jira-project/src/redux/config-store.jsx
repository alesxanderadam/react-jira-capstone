import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducers/projectReducer'
export const store = configureStore({
    reducer: {
        projectReducer
    }
})