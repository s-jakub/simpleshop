import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getProductsListByCategory = createAsyncThunk(
    "prodcut/getProductsListByCategory",
    async ({mainCategory, subCategory}) => {

        const { data } = await axios.get(`https://my-simpleshop.herokuapp.com/api/products/${mainCategory}/${subCategory}`)
        return data; 
    }
)

const initialState = {
    productsByCategory: [],
    status: null,
}

export const productCategorySlice = createSlice({
    name: 'productByCategory',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [getProductsListByCategory.pending]: (state, action) => {
            state.status = 'loading'
        },

        [getProductsListByCategory.fulfilled]: (state, action) => {
            state.status = 'success';
            state.productsByCategory = action.payload
        },

        [getProductsListByCategory.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Request failed with status code 404'
        }
    }
})


export default productCategorySlice.reducer