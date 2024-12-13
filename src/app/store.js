import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './feature/auth/authApi'
import  authReducer  from './feature/auth/authSlice'
import { categoryApi } from './feature/category/categoryApi'
import { imageApi } from './feature/uploadeImage/imageApi'
import { subCategoryApi } from './feature/subCategory/subCategoryApi'
import { productApi } from './feature/product/productApi'
import  productReducer  from './feature/product/productSlice'
import { cartApi } from './feature/cart/cartApi'
import  cartReducer  from './feature/cart/cartSlice'

export const store = configureStore({
  reducer: {
    auth:  authReducer,
    product: productReducer  ,
    cart: cartReducer  ,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,categoryApi.middleware,imageApi.middleware,subCategoryApi.middleware,productApi.middleware,cartApi.middleware),
})

setupListeners(store.dispatch)