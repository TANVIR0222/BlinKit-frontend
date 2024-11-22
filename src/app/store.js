import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './feature/auth/authApi'
import  authReducer  from './feature/auth/authSlice'
import { categoryApi } from './feature/category/categoryApi'
import { imageApi } from './feature/uploadeImage/imageApi'
import { subCategoryApi } from './feature/subCategory/subCategoryApi'
import { productApi } from './feature/product/productApi'

export const store = configureStore({
  reducer: {
    auth:  authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,categoryApi.middleware,imageApi.middleware,subCategoryApi.middleware,productApi.middleware),
})

setupListeners(store.dispatch)