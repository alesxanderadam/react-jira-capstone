import { createSlice } from '@reduxjs/toolkit'
import { get, has } from 'lodash';
import { http } from '../../util/config';
const initialState = {
    userArr: null,
}

const MangeReducer = createSlice({
    name: 'MangeReducer',
    initialState,
    reducers: {
        userManagerAction:(state, actions)=>{
            state.userArr = actions.payload
        },
        delUserAction:(state,actions) =>{
            state = actions.payload
        }
    }
});

export const {userManagerAction,delUserAction} = MangeReducer.actions

export default MangeReducer.reducer

export const getUserManager =()=>{
    return async(dispatch) =>{
        try{
            const result = await http.get("/api/Users/getUser");
            return dispatch(userManagerAction(result.data.content))
        }
        catch(err){
        console.log(err)
        }
    }
}

export const deleteUserManager =(id)=>{
    return async dispatch =>{
        try {
            const result = await http.delete(`/api/Users/deleteUser?id=${id}`)
            console.log(id)
            dispatch(getUserManager())
        }
        catch(err){
            console.log(err)
        }
    }
}