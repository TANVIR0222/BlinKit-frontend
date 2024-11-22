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
      })
    }),
  }),
})

export const { useProductUploadeMutation  } = productApi