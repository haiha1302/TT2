import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slice/userSlice'

const store = configureStore({
    reducer: {
        User: userSlice
    }
})

export default store