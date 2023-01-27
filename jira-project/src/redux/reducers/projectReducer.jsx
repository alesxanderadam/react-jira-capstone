import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

import { getStore, http } from '../../util/config';
import { ACCESS_TOKEN, TOKEN_CYBER} from '../../util/config'

const initialState = {
    allProject: null,
    arrProjectCategory:[],
    creatProject:''
}

const projectReducer = createSlice({
    name: "projectReducer",
    initialState,
    reducers: {
        getAllProjectAction: (state, action) => {
            state.allProject = action.payload
        },
        getAllProjectCategoryAction:(state, action)=>{
            state.arrProjectCategory = action.payload;
        },
        getCreateProjetcAction:(state,action)=>{
            state.creatProject = action.payload;
        }
    }
});

export const { getAllProjectAction, getAllProjectCategoryAction, getCreateProjetcAction } = projectReducer.actions

export default projectReducer.reducer

export const getAllProjectApi = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/Project/getAllProject')
            console.log(result.data.content)
            dispatch(getAllProjectAction(result.data.content))
        } catch (err) {
            console.log(err)
            return;
        }
    }
}
export const getAllProjectCategoryApi =()=>{
    return async dispatch=>{
            const result = await http.get("/api/ProjectCategory");
            const action = getAllProjectCategoryAction(result.data.content)
            dispatch(action)
            
        
    }
}
export const createProjectApi = (newProject)=>{
    return async (dispatch)=>{
        const result = await axios.post('https://jiranew.cybersoft.edu.vn/api/Project/createProjectAuthorize', newProject, {
            headers: {
                'Authorization': `Bearer ${getStore(ACCESS_TOKEN)}`,
                'TokenCybersoft': TOKEN_CYBER,
            }
        });
        const action = getCreateProjetcAction(result.data.content);
        dispatch(action)
        alert('Successfull')
        
    }
}