import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../app";
import { ACCESS_TOKEN, USER_LOGIN, USER_PROFILE, USER_REGISTER, http, getStorageJson, setStorageJson, setStorage} from '../../util/config'



const initialState = {
    userLogin:getStorageJson(USER_LOGIN),
    userProfile:getStorageJson(USER_PROFILE),
    userRegister:getStorageJson(USER_REGISTER)
}

const userReducer = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        getUserLoginAction: (state, action) => {
        state.userLogin = action.payload;
        },
        getUserRegisterAction: (state, action) => {
        state.userRegister = action.payload;
        },
        getProfileAction: (state, action) => {
        state.userProfile = action.payload;
        },
        editProfileAction: (state, action) => {
        state = action.payload
        },
        deleProfileAction: (state, action) => {
        state = action.payload
        }
    }
});

export const {getUserLoginAction, getUserRegisterAction, getProfileAction, editProfileAction, deleProfileAction} = userReducer.actions

export default userReducer.reducer

/*asyn <action></action>*/
export const loginApi = (userLogin)=>{
    return async (dispatch)=>{
        const result = await http.post("/api/Users/signin",userLogin);
        
        //cap nhat cho reducer
        
        const action = getUserLoginAction(result.data.content);
        dispatch(action);
        setStorage(ACCESS_TOKEN, result.data.content.accessToken)
        setStorageJson(USER_LOGIN, result.data.content)
        history.push('/')
    }
}
export const registerApi = (userRegister) => {
    return async (dispatch) => {
      const result = await http.post("/api/Users/signup", userRegister);
      // cập nhật cho reducer
      const action = getUserRegisterAction(result.data.content);
      dispatch(action);
      alert('Đăng ký tài khoản thành công, mời đăng nhập !');
      history.push("/login");
    };
  };