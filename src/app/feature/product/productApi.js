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

  }),
})

export const { useProductUploadeMutation , useGetProductsQuery } = productApi