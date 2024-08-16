import {configureStore} from '@reduxjs/toolkit'
import * as reducers from './slices/index.js'

const store = configureStore({
    reducer: {
        user: reducers.userReducer,
        investing: reducers.investingReducer
    }
})

export default store