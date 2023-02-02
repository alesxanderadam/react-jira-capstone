import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./reducers/projectReducer";
import taskReducer from "./reducers/taskReducer";
import userReducer from "./reducers/userReducer";
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    projectReducer:projectReducer,
    taskReducer:taskReducer
  },
});