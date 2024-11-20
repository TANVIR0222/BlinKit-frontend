import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/category/` }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    addCategory: builder.mutation({
        query: (newPost) => ({
            url: `add-category`,
            method: 'POST',
            body: newPost,
        }),
        invalidatesTags: ['Category'],
    }),
    getAllCategory: builder.query({
        query: () => `all-category`,
        providesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: (newPost) => ({
        url: `update-category/${newPost.id}`,
        method: 'PUT',
        body: newPost,
        }),
        invalidatesTags: ['Category'],
        }),

  }),
})


export const { useAddCategoryMutation , useGetAllCategoryQuery , useUpdateCategoryMutation } = categoryApi