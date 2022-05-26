import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { resetUserOrderList } from "./userOrdersSlice";


export const login = createAsyncThunk(
    "user/userLogin",
    async ({email, password}) => {
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const {data} = await axios.post(`https://my-simpleshop.herokuapp.com/api/user/login`, {email, password}, config)

        localStorage.setItem('userInfo', JSON.stringify(data))
        return data; 
    }
)

export const register = createAsyncThunk(
    "user/userRegister",
    async ({name, subname, email, password}) => {
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const {data} = await axios.post(`https://my-simpleshop.herokuapp.com/api/user/register`, {name, subname, email, password}, config)

        localStorage.setItem('userInfo', JSON.stringify(data))
        return data; 
    }
)


export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (user, {getState}) => {

        const { userInfo } = getState().user

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.put(`https://my-simpleshop.herokuapp.com/api/user/profile`, user, config)

        localStorage.setItem('userInfo', JSON.stringify(data))
        return data; 
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async (_, {dispatch}) => {

            localStorage.removeItem('userInfo');
            document.location.href = '/login';
            dispatch(resetUserOrderList())
      
    }
)


const getUserFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}


const initialState = {
    userInfo: getUserFromLocalStorage,
    status: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading'
        },

        [login.fulfilled]: (state, action) => {
            state.status = 'success';
            state.userInfo = action.payload
            state.errorMsg = null
        },

        [login.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = "Niewłaściwa nazwa użytkownika lub hasło"
        },
        [register.pending]: (state, action) => {
            state.status = 'loading'
        },

        [register.fulfilled]: (state, action) => {
            state.status = 'success';
            document.location.href = '/'
            state.errorMsg = null
        },

        [register.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = "Taki użytkownik już istnieje"
        },
        [updateProfile.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateProfile.fulfilled]: (state, action) => {
            state.status = 'success';
            state.userInfo = action.payload
            state.errorMsg = null
        },

        [updateProfile.rejected]: (state, action) => {
            state.status = 'failed'
            state.errorMsg = "Nie udało się zaktualizować profilu"
        }
    }
})



export default userSlice.reducer