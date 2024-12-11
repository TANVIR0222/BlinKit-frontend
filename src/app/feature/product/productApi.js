import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/product/` }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    productUploade: builder.mutation({
      query: (newData) => ({
        url: `add-product`,
        method: 'POST',
        body:  newData
      }),
      invalidatesTags:['Product']
    }),
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
       `all-product?page=${page}&limit=${limit}&search=${search}`,
      providesTags:['Product']
    }),
    getProductByCategory: builder.mutation({
      query: (id) =>({
        url: `get-product-by-category`,
        method: 'POST',
        body: id
      }),
      invalidatesTags:['Product']
    }),
    getSingleProductById: builder.query({
      query: (id) => `get-single-product-by-id/${id}`,
      providesTags:['Product']
    }),

  }),
})

export const { useProductUploadeMutation , useGetProductsQuery  , useGetProductByCategoryMutation ,useGetSingleProductByIdQuery } = productApi