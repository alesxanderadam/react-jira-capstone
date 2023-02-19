import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import axios from 'axios';
import { history } from '../../app';
import { settings, http } from '../../util/config';
import { ACCESS_TOKEN, TOKEN_CYBER } from '../../util/config'
import { getProjectDetailApi } from './projectReducer';

const initialState = {
    arrStatus: [],
    arrPriority: [],
    arrTaskType: [],
    arrUserByProjectId: [],
    createTask: [],
    taskDetail: [],
    taskUpdate: [],
    updateStatus: [],
    updatePriority: [],
    updateDescription: [],
    updateTimeTracking: [],
    updateEstimate:[],
    
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
        getTaskDetailByIdAction: (state, action) => {
            state.taskDetail = action.payload
        },
        getUserByProjectIdAction: (state, action) => {
            state.arrUserByProjectId = action.payload
        },
        createTaskAction: (state, action) => {
            state.createTask = action.payload
        },
        updatetaskAction: (state, action) => {
            state.taskUpdate = action.payload
        },
        updateStatusAction: (state, action) => {
            state.updateStatus = action.payload
        },
        updatePriorityAction: (state, action) => {
            state.updatePriority = action.payload
        },
        updateDescriptionAction: (state, action) => {
            state.updateDescription = action.payload
        },
        updateTimeTrackingAction: (state, action) => {
            state.updateTimeTracking = action.payload
        },
        updateEstimateAction: (state, action) => {
            state.updateEstimate = action.payload
        },
        delTaskAction: (state, action) => {
            state = action.payload
        },
    }
});

export const { getStatusAction, getPriorityAction, getTaskTypeAction, getUserByProjectIdAction, createTaskAction, getTaskDetailByIdAction, updatetaskAction, updateStatusAction, updateDescriptionAction, updatePriorityAction, updateTimeTrackingAction, updateEstimateAction, delTaskAction} = taskReducer.actions

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
        try {
            const result = await http.get(`/api/Users/getUserByProjectId?idProject=${projectID}`)
            const action = getUserByProjectIdAction(result.data.content);
            dispatch(action)
        } catch (err) {
            return
        }

    }
}
export const getTaskDetailByIdApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/Project/getTaskDetail?taskId=${id}`)
            console.log(result.data.content)
            return dispatch(getTaskDetailByIdAction(result.data.content))
        } catch (err) {
            console.log("Get Task detail error", err)
        }
    }
}
export const createTaskApi = (newTask) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/Project/createTask', newTask)
            const action = createTaskAction(result.data.content);
            dispatch(action)
            message.success(`${result.data.message}`)
            history.push('/')
        } catch {
            message.error('You are not the owner of this project')
        }
    }
}
export const updateTasskApi = (updateTask) => {
    return async dispatch => {
        try {
            const reuslt = await http.post('/api/Project/updateTask', updateTask)
            dispatch(updatetaskAction(reuslt.data.content))
            message.success(`${reuslt.data.message}`)
        } catch (err) {
            return;
        }
    }
}
export const updateStatusApi = (updateStatus) => {
    return async dispatch => {
        try {
            const reuslt = await http.put('/api/Project/updateStatus', updateStatus)
            dispatch(updateStatusAction(reuslt.data.content))
            // message.success(`${reuslt.data.message}`)
        } catch (err) {
            if(err.response.data.statusCode === 404 &&
                err.response.data.content === "user is not assign!"){
                    message.error('User is not assign!')
                }
                else return
        }
    }
}
export const updateDescriptionApi = (updateStatus) => {
    return async dispatch => {
        try {
            const reuslt = await http.put('/api/Project/updateDescription', updateStatus)
            dispatch(updateDescriptionAction(reuslt.data.content))
            message.success(`${reuslt.data.message}`)
        } catch (err) {
            if(err.response.data.statusCode === 404 &&
                err.response.data.content === "user is not assign!"){
                    message.error('User is not assign!')
                }
                else return
        }
    }
}
export const updatePriorityApi = (updateStatus) => {
    return async dispatch => {
        try {
            const reuslt = await http.put('/api/Project/updatePriority', updateStatus)
            dispatch(updatePriorityAction(reuslt.data.content))
        } catch (err){
            if(err.response.data.statusCode === 404 &&
                err.response.data.content === "user is not assign!"){
                    message.error('User is not assign!')
                }
                else return
        }
    }
}
export const updateTimeTrackingApi = (updateTimeTracking) => {
    return async dispatch => {
        try {
            const result = await http.put('api/Project/updateTimeTracking', updateTimeTracking)
            dispatch(updateTimeTrackingAction(result.data.content))
        } catch (err) {
            if(err.response.data.statusCode === 404 &&
                err.response.data.content === "user is not assign!"){
                    message.error('User is not assign!')
                }
                else return
        }
    }
}
export const updateEstimateApi = (updateEstimate) => {
    return async dispatch => {
        try {
            const result = await http.put('api/Project/updateEstimate',updateEstimate)
            dispatch(updateEstimateAction(result.data.content))
        } catch(err) {
            if(err.response.data.statusCode === 404 &&
                err.response.data.content === "user is not assign!"){
                    message.error('User is not assign!')
                }
                else return
        }
    }
}
export const delTaskApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.delete(`/api/Project/removeTask?taskId=${id}`)
            dispatch(delTaskAction(result.data.content))
            message.success(result.data.content)
        }
        catch (err) {
            return;
        }
    }
}