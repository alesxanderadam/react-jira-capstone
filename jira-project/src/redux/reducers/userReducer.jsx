import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, http, settings, USER_LOGIN } from '../../util/config';

const initialState = {
    Login: settings.getStore(ACCESS_TOKEN) ? settings.getStore(ACCESS_TOKEN) : null
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userloginAction: (state, aciton) => {
            state.Login = aciton.payload
        },
    }
});

export const { userloginAction } = userReducer.actions

export default userReducer.reducer

export const userLoginApi = (userLogin) => {
    return async dispatch => {
        try {
            const result = await http.post('/api/Users/signin', userLogin)
            settings.setStorageJson(USER_LOGIN, result.data.content)
            settings.setStorage(ACCESS_TOKEN, result.data.content.accessToken)
            return dispatch(userloginAction(result.data.content))
        } catch (err) {
            console.log(err)
        }
    }
} 