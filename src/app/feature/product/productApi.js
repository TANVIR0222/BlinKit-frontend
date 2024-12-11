import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/product/` }),
  endpoints: (builder) => ({
    productUploade: builder.mutation({
      query: (newData) => ({
        url: `add-product`,
        method: 'POST',
        body:  newData
      }),
    }),
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
       `all-product?page=${page}&limit=${limit}&search=${search}`,
    }),
    getProductByCategory: builder.mutation({
      query: (id) =>({
        url: `get-product-by-category`,
        method: 'POST',
        body: id
      }),
      invalidatesTags:['Product'],
    }),

  }),
})

export const { useProductUploadeMutation , useGetProductsQuery  , useGetProductByCategoryMutation} = productApi