import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { clearCartItems } from "./cartSlice";


export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (order, {getState, dispatch}) => {

        const { userInfo } = getState().user

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.post(`https://my-simpleshop.herokuapp.com/api/orders`, order, config)

        dispatch(clearCartItems())
        localStorage.removeItem('cartItems')
        return data; 
    }
)

const initialState = {
    order: {},
    status: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      
    },
    extraReducers: {
        [createOrder.pending]: (state, action) => {
            state.status = 'loading'
        },

        [createOrder.fulfilled]: (state, action) => {
            state.status = 'success';
            state.order = action.payload
            state.errorMsg = null
        },

        [createOrder.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Nie można złożyć zamówienia'
        }
    }
})


export default orderSlice.reducer