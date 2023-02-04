import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { http } from '../../util/config';

const initialState = {
    allProject: null,
    detailProject: null,
    newProject: null,
    projectUpdate: null,
    searchUserName: null
}

const projectReducer = createSlice({
    name: "projectReducer",
    initialState,
    reducers: {
        getAllProjectAction: (state, action) => {
            state.allProject = action.payload
        },
        getDetailProjectAction: (state, action) => {
            state.detailProject = action.payload
        },
        addProjectAction: (state, action) => {
            state.newProject = action.payload
        },
        editProjectAction: (state, action) => {
            state.projectUpdate = action.payload
        },
        delProjectAction: (state, action) => {
            state = action.payload
        },
        searchUserNameAction: (state, action) => {
            state.searchUserName = action.payload
        }
    }
});

export const { getAllProjectAction, addProjectAction, getDetailProjectAction, editProjectAction, delProjectAction, searchUserNameAction } = projectReducer.actions

export default projectReducer.reducer

export const getAllProjectApi = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Project/getAllProject`)
            dispatch(getAllProjectAction(result.data.content))
        } catch (err) {
            return;
        }
    }
}

export const getAllProjectSearchApi = (keyword) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Project/getAllProject?keyword=${keyword}`)
            dispatch(getAllProjectAction(result.data.content))
        } catch (err) {
            return dispatch(getAllProjectApi());
        }
    }
}


export const getProjectDetailApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/Project/getProjectDetail?id=${id}`)
            dispatch(getDetailProjectAction(result.data.content))
        } catch (err) {
            return;
        }
    }
}

export const addProjectApi = (project) => {
    return async dispatch => {
        try {
            const result = await http.post('/api/Project/createProjectAuthorize', project)
            dispatch(addProjectAction(result.data.content))
            message.success(result.data.message)
        } catch (err) {
            return;
        }
    }
}

export const editProjectApi = (id, updateProject) => {
    return async dispatch => {
        try {
            const reuslt = await http.put(`/api/Project/updateProject?projectId=${id}`, updateProject)
            dispatch(editProjectAction(reuslt.data.content))
            message.success(`${reuslt.data.message}`)
        } catch (err) {
            return;
        }
    }
}

export const delProjectApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.delete(`/api/Project/deleteProject?projectId=${id}`)
            dispatch(delProjectAction(result.data.content))
            dispatch(getAllProjectApi());
        }
        catch (err) {
            return;
        }
    }
}

export const searchUserNameApi = (keyword) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/Users/getUser?keyword=${keyword}`)
            dispatch(searchUserNameAction(result.data.content))
        } catch (err) {
            console.log(err)
        }
    }
}