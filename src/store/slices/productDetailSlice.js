import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getProductDetail = createAsyncThunk(
    "prodcut/getProductDetail",
    async (productId) => {
        const { data } = await axios.get(`https://my-simpleshop.herokuapp.com/api/products/${productId}`)
        return data; 
    }
)

const initialState = {
    product: [],
    status: null,
}

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [getProductDetail.pending]: (state, action) => {
            state.status = 'loading'
        },

        [getProductDetail.fulfilled]: (state, action) => {
            state.status = 'success';
            state.product = action.payload
        },

        [getProductDetail.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Request failed with status code 404'
        }
    }
})


export default productDetailSlice.reducer