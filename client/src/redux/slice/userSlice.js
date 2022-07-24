import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from '../../utils/http'

export const checkUser = createAsyncThunk('/user/checkUser', async () => {
    const res = await http.get('/user/check-user')
    return res.data
})

export const registerUser = createAsyncThunk('/userSlice/register', async (dataUser) => {
    const res = await http.post('/user/register', dataUser)
    return res.data
})

export const verifyOtp = createAsyncThunk('/userSlice/verify', async (dataVerify) => {
    const res = await http.post('/user/verify', dataVerify)
    return res.data
})

export const loginUser = createAsyncThunk('/userSlice/login', async (dataLogin) => {
    const res = await http.post('/user/login', dataLogin)
    return res.data
})

export const getProfileUser = createAsyncThunk('/userSlice/profile', async (idUser) => {
    console.log('thunk', idUser);
    const res = await http.post('/user/profile', idUser)
    return res.data
})

const userSlice = createSlice({
    name: 'User',
    initialState: {
        email: [],
        verify: [],
        inforUserLogin: null,
        profileUser: null
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.email = action.payload.element
        },

        [verifyOtp.fulfilled]: (state, action) => {
            state.verify = action.payload.element.insertedId
        },

        [loginUser.fulfilled]: (state, action) => {
            state.inforUserLogin = action.payload
        },

        [checkUser.fulfilled]: (state, action) => {
            state.inforUserLogin = action.payload
        },

        [getProfileUser.fulfilled]: (state, action) => {
            state.profileUser = action.payload
        }
    }
})

export default userSlice.reducer