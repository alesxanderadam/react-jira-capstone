import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { history } from '../../app';
import { settings, http } from '../../util/config';
import { ACCESS_TOKEN, TOKEN_CYBER } from '../../util/config'

const initialState = {
    arrStatus: [],
    arrPriority: [],
    arrTaskType: [],
    arrUserByProjectId: [],
    createTask: []
}

const taskReducer = createSlice({
    name: "taskReducer",
    initialState,
    reducers: {
        getStatusAction: (state, action) => {
            state.arrStatus = action.payload;
        },
        getPriorityAction: (state, action) => {
            state.arrPriority = action.payload;
        },
        getTaskTypeAction: (state, action) => {
            state.arrTaskType = action.payload
        },
        getUserByProjectIdAction: (state, action) => {
            state.arrUserByProjectId = action.payload
        },
        createTaskAction: (state, action) => {
            state.createTask = action.payload
        }
    }
});

export const { getStatusAction, getPriorityAction, getTaskTypeAction, getUserByProjectIdAction, createTaskAction } = taskReducer.actions

export default taskReducer.reducer


export const getAllStatusApi = () => {
    return async (dispatch) => {
        const result = await http.get("/api/Status/getAll");
        const action = getStatusAction(result.data.content);
        dispatch(action)
    }
}
export const getPriorityApi = () => {
    return async (dispatch) => {
        const result = await http.get("/api/Priority/getAll");
        const action = getPriorityAction(result.data.content);
        dispatch(action)
    }
}
export const getTaskTypeApi = () => {
    return async (dispatch) => {
        const result = await http.get("/api/TaskType/getAll");
        const action = getTaskTypeAction(result.data.content);
        dispatch(action)
    }
}
export const getUserByProjectIdApi = (projectID) => {
    return async (dispatch) => {
        const result = await http.get(`/api/Users/getUserByProjectId?idProject=${projectID}`)
        const action = getUserByProjectIdAction(result.data.content);
        dispatch(action)
    }
}
export const createTaskApi = (newTask) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/Project/createTask', newTask)
            const action = createTaskAction(result.data.content);
            dispatch(action)
            alert('Successfull')
            history.push('/')
        } catch {
            alert('Create task fail')
        }
    }
}