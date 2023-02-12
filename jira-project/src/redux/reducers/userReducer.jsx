import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { history } from '../../app';
import { PageConstant } from '../../common/page.constant';
import { ACCESS_TOKEN, http, settings, USER_LOGIN } from '../../util/config';
import bcrypt from "bcryptjs";
const initialState = {
    Login: settings.getStore(ACCESS_TOKEN) ? settings.getStore(ACCESS_TOKEN) : null,
    Register: null,
    AllUsers: null,
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userloginAction: (state, aciton) => {
            state.Login = aciton.payload
            settings.setStorageJson(USER_LOGIN, aciton.payload)
            settings.setStorage(ACCESS_TOKEN, aciton.payload.accessToken)
            history.push('/')
        },
        userRegisterAction: (state, action) => {
            state.Register = action.payload
        },
        getAllUserAction: (state, action) => {
            state.AllUsers = action.payload
        },
        editUserAction: (state, action) => {
            state = action.payload
        }
    }
});

export const { userloginAction, userRegisterAction, getAllUserAction, editUserAction } = userReducer.actions

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
export const getAllUserApi = (getUser) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/Users/getUser?keyword=${getUser}`)
            console.log(result.data.content)
            return dispatch(getAllUserAction(result.data.content))
        } catch (err) {
            // console.log(err)
        }
    }
}
export const editUserApi = (user) => {
    return async dispatch => {
        try {
            const result = await http.put('/api/Users/editUser', user)
            dispatch(editUserAction(result.data.content))
            user.passWord = bcrypt.hashSync(user.passWord, 10);
            user.confirm = bcrypt.hashSync(user.confirm, 10);
            settings.setStorageJson(USER_LOGIN, user)
            //có phải cái result là cái e sẽ update phải ko v cái setlocal phải là result chứ
            message.success(result.data.message)
        } catch (err) {
            return
        }
    }
}