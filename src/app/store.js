import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './feature/auth/authApi'
import  authReducer  from './feature/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth:  authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)