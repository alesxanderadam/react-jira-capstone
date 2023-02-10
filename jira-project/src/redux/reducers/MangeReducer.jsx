import { createSlice } from '@reduxjs/toolkit'
import { has } from 'lodash';
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
        }
    }
});

export const {userManagerAction} = MangeReducer.actions

export default MangeReducer.reducer

export const getUserManager =()=>{
    return async(dispatch) =>{
        try{
            const result = await http.get("/api/Users/getUser");
            console.log(result.data.content)
            return dispatch(userManagerAction(result.data.content))
        }
        catch(err){
        console.log(err)
        }
    }
}