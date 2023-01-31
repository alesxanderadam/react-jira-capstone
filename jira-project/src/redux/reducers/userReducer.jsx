import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { history } from '../../app';
import { PageConstant } from '../../common/page.constant';
import { ACCESS_TOKEN, http, settings, USER_LOGIN } from '../../util/config';
const initialState = {
    Login: settings.getStore(ACCESS_TOKEN) ? settings.getStore(ACCESS_TOKEN) : null,
    Register: null,
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userloginAction: (state, aciton) => {
            state.Login = aciton.payload
            settings.setStorageJson(USER_LOGIN, aciton.payload)
            settings.setStorage(ACCESS_TOKEN, aciton.payload.accessToken)
            history.push(`${PageConstant.project}`)
        },
        userRegisterAction: (state, action) => {
            state.Register = action.payload
        }
    }
});

export const { userloginAction, userRegisterAction } = userReducer.actions

export default userReducer.reducer

export const userLoginApi = (userLogin) => {
    return async dispatch => {
        try {
            const result = await http.post('/api/Users/signin', userLogin)
            message.success(result.data.message)
            return dispatch(userloginAction(result.data.content))
        } catch (err) {
            message.error(err.response.data.message)
        }
    }
}

export const userRegisterApi = (userRegister) => {
    return async dispatch => {
        try {
            const result = await http.post('/api/Users/signup', userRegister)
            history.push(`${PageConstant.login}`)
            message.warning('Enter your email and password to login')
            return dispatch(userRegisterAction(result.data.content))
        } catch (err) {
            console.log(err)
        }
    }
} 