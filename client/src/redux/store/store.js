import { configureStore } from '@reduxjs/toolkit'
import portSlice from '../slice/portSlice'
import userSlice from '../slice/userSlice'

const store = configureStore({
    reducer: {
        User: userSlice,
        Posts: portSlice
    }
})

export default store