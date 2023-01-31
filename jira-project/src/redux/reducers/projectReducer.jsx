import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';

const initialState = {
    allProject: null
}

const projectReducer = createSlice({
    name: "projectReducer",
    initialState,
    reducers: {
        getAllProjectAction: (state, action) => {
            state.allProject = action.payload
        }
    }
});

export const { getAllProjectAction } = projectReducer.actions

export default projectReducer.reducer

export const getAllProjectApi = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/Project/getAllProject')
            dispatch(getAllProjectAction(result.data.content))
        } catch (err) {
            console.log(err)
            return;
        }
    }
}