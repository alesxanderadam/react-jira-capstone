import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { http } from "../../util/config";
const initialState = {
  userArr: null,
  userDetail:null,
  userEdit:null,
};

const MangeReducer = createSlice({
  name: "MangeReducer",
  initialState,
  reducers: {
    userManagerAction: (state, actions) => {
      state.userArr = actions.payload;
    },
    delUserAction: (state, actions) => {
      state = actions.payload;
    },
    detailUserAction:(state,actions) =>{
      state.userDetail = actions.payload;
    },
    userEditAction:(state,actions) =>{
      state.userDetail =actions.payload;
    }
  },
});

export const { userManagerAction, delUserAction,detailUserAction,userEditAction } = MangeReducer.actions;

export default MangeReducer.reducer;

export const getUserManager = () => {
  return async (dispatch) => {
    try {
      const result = await http.get("/api/Users/getUser");
      return dispatch(userManagerAction(result.data.content));
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
};

export const deleteUserManager = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.delete(`/api/Users/deleteUser?id=${id}`);
      message.success(result.data.message)
      dispatch(delUserAction(result.data.content))
      dispatch(getUserManager());
    } catch (err) {
      message.error(err.response.data.message);
      return;
    }
  };
};
export const getUserById = (id) =>{
  return async dispatch =>{
    try{
      const result = await http.get(`/api/Users/getUser?keyword=${id}`)
      dispatch(detailUserAction(result.data.content[0]))
    }
    catch (err){
      return;
    }
  }
}
export const editUserByid = (values) =>{
  return async dispatch =>{
    try{
      const result = await http.put(`/api/Users/editUser`,values)
      dispatch(userEditAction(result.data.content))
      message.success(`${result.data.message}`)
    }
    catch (err){
      console.log(err)
      return;
    }
  }
}