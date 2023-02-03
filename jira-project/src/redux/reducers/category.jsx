import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';

const initialState = {
    Category: null
}

const Category = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        getAllCategoryAction: (state, action) => {
            state.Category = action.payload
        }
    }
});

export const { getAllCategoryAction } = Category.actions

export default Category.reducer

export const getAllCategoryApi = () => {
    return async dispatch => {
        const result = await http.get('/api/ProjectCategory')
        dispatch(getAllCategoryAction(result.data.content))
    }
}