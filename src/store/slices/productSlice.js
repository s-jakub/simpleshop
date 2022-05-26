import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getProductsList = createAsyncThunk(
    "prodcut/getProductsList",
    async ({keyword=" ", pageNumber=" "}) => {

        const { data } = await axios.get(`https://my-simpleshop.herokuapp.com/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        return data; 
    }
)

const initialState = {
    products: [],
    status: null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [getProductsList.pending]: (state, action) => {
            state.status = 'loading'
        },

        [getProductsList.fulfilled]: (state, action) => {
            state.status = 'success';
            state.pages = action.payload.pages
            state.page = action.payload.page
            state.products = action.payload.products
        },

        [getProductsList.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Request failed with status code 404'
        }
    }
})


export default productSlice.reducer