import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({productId, qty}, thunkAPI ) => {
        const { data } = await axios.get(`https://my-simpleshop.herokuapp.com/api/products/${productId}`)

        thunkAPI.dispatch(addItem({
                                    product: productId,
                                    name: data.name,
                                    image: data.image,
                                    price: data.price,
                                    countInStock: data.countInStock,
                                    quantity: qty
                                    
                                }))

        localStorage.setItem('cartItems', JSON.stringify(thunkAPI.getState().cart.cartItems))
    }
)


export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async(product, thunkAPI) => {

        thunkAPI.dispatch(removeItem(product))
        localStorage.setItem('cartItems', JSON.stringify(thunkAPI.getState().cart.cartItems))

    }
)

export const saveDeliveryAddress = createAsyncThunk(
    "cart/saveDeliveryAddress",
    async(deliveryObj, thunkAPI) => {

        thunkAPI.dispatch(setDeliveryAddress(deliveryObj))
        localStorage.setItem('deliveryAddress', JSON.stringify(deliveryObj))

    }
)

export const savePaymentMethod = createAsyncThunk(
    "cart/savePaymentMethod",
    async({paymentMethod}, thunkAPI) => {

        thunkAPI.dispatch(setPaymentMethod(paymentMethod))
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))

    }
)


const getItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const getDeliveryAddressFromLocalStorage = localStorage.getItem('deliveryAddress') ? JSON.parse(localStorage.getItem('deliveryAddress')) : {}
const getPaymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null

const initialState = {
    cartItems: getItemsFromLocalStorage,
    deliveryAddress: getDeliveryAddressFromLocalStorage,
    paymentMethod: getPaymentMethodFromLocalStorage
}

export const cartSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
       addItem: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(val => val.product === item.product )

            if(existItem) {
                return { 
                    ...state, 
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] 
                }
            }
       },

       removeItem: (state, action) => {
           const item = action.payload;
           
           return {
               ...state,
               cartItems: state.cartItems.filter(val => val.product !== item.product)
           }
       },

       setDeliveryAddress: (state, action) => {
           return {
               ...state,
               deliveryAddress: action.payload
           }
       },

       setPaymentMethod: (state, action) => {
           return {
               ...state,
               paymentMehtod: action.payload
           }
       },

       clearCartItems: (state, action) => {
        return {
            ...state,
            cartItems: []
        }
    }
    },
    
})

export const { addItem, removeItem, setDeliveryAddress, setPaymentMethod, clearCartItems } = cartSlice.actions

export default cartSlice.reducer