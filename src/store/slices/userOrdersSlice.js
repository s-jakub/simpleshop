import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getUserOrdersList = createAsyncThunk(
    "order/getUserOrdersList",
    async (_, { getState }) => {

        const { userInfo } = getState().user

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('https://my-simpleshop.herokuapp.com/api/orders', config)
        return data; 
    }
)

const initialState = {
    orders: [],
    status: null,
}

export const userOrdersSlice = createSlice({
    name: 'userOrder',
    initialState,
    reducers: {
       resetUserOrderList: (state, action) => {
           state.orders = []
       }
    },
    extraReducers: {
        [getUserOrdersList.pending]: (state, action) => {
            state.status = 'loading'
        },

        [getUserOrdersList.fulfilled]: (state, action) => {
            state.status = 'success';
            state.orders = action.payload
        },

        [getUserOrdersList.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = 'Request failed with status code 404'
        }
    }
})

export const { resetUserOrderList } = userOrdersSlice.actions

export default userOrdersSlice.reducer