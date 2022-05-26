import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const addReview = createAsyncThunk(
    "product/addReview",
    async ({productId, review}, { getState }) => {
        const { userInfo } = getState().user;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.post(`https://my-simpleshop.herokuapp.com/api/products/${productId}/review`, review, config)

        return data; 
    }
)

const initialState = {
    review: [],
    status: null,
}

export const productReviewSlice = createSlice({
    name: 'productReview',
    initialState,
    reducers: {
        resetAddReview: (state, action) => {
            return {}
        }
    },
    extraReducers: {
        [addReview.pending]: (state, action) => {
            state.status = 'loading'
        },

        [addReview.fulfilled]: (state, action) => {
            state.status = 'success';
            state.review = action.payload
            state.errorMsg = null
        },

        [addReview.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = "Ten produkt został przez ciebie już oceniony"
        },
      
    }
})

export const { resetAddReview } = productReviewSlice.actions

export default productReviewSlice.reducer