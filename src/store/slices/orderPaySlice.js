import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const setOrderPay = createAsyncThunk(
    "order/payOrder",
    async (orderId, {getState, dispatch}) => {

        const { userInfo } = getState().user

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.put(`https://my-simpleshop.herokuapp.com/api/orders/${orderId}/pay`, {} ,config)
        return data; 
    }
)

const initialState = {
    orderPay: {},
    status: null
}

export const orderPaySlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      
    },
    extraReducers: {
        [setOrderPay.pending]: (state, action) => {
            state.status = 'loading'
        },

        [setOrderPay.fulfilled]: (state, action) => {
            state.status = 'success';
            state.orderPay = action.payload
            state.errorMsg = null
        },

        [setOrderPay.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Nie można złożyć zamówienia'
        }
    }
})


export default orderPaySlice.reducer