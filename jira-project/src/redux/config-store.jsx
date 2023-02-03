import { configureStore } from '@reduxjs/toolkit';
import category from './reducers/category';
import projectReducer from './reducers/projectReducer'
import userReducer from './reducers/userReducer';
export const store = configureStore({
    reducer: {
        projectReducer,
        userReducer,
        category
    }
})