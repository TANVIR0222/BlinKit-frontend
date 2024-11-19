import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/category/` }),
  endpoints: (builder) => ({
    addCategory: builder.mutation({
        query: (newPost) => ({
            url: `add-category`,
            method: 'POST',
            body: newPost,
        }),
    })
  }),
})


export const { useAddCategoryMutation } = categoryApi