import { configureStore } from '@reduxjs/toolkit';
import category from './reducers/category';
import projectReducer from './reducers/projectReducer'
import userReducer from './reducers/userReducer';
import taskReducer from "./reducers/taskReducer";
import MangeReducer from "./reducers/MangeReducer";

export const store = configureStore({
    reducer: {
        projectReducer,
        userReducer,
        category,
        taskReducer,
        MangeReducer,
    }
})