import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getOrderDetails = createAsyncThunk(
    "order/getOrderDetails",
    async (orderId, {getState, dispatch}) => {

        const { userInfo } = getState().user

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`https://my-simpleshop.herokuapp.com/api/orders/${orderId}`, config)
        return data; 
    }
)

const initialState = {
    order: {},
    status: 'loading'
}

export const orderDetails = createSlice({
    name: 'order',
    initialState,
    reducers: {
      
    },
    extraReducers: {
        [getOrderDetails.pending]: (state, action) => {
            state.status = 'loading'
        },

        [getOrderDetails.fulfilled]: (state, action) => {
            state.status = 'success';
            state.order = action.payload
            state.errorMsg = null
        },

        [getOrderDetails.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Nie znaleziono zamówienia'
        }
    }
})


export default orderDetails.reducer