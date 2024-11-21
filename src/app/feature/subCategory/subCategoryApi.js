import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const subCategoryApi = createApi({
  reducerPath: 'subCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/subcategory/` }),
  tagTypes: ['SubCategory'],
  endpoints: (builder) => ({
    subCategoryUploade: builder.mutation({
        query: (newData) => ({
            url: `add-sub-category`,
            method: 'POST',
            body: newData,
        }),
        invalidatesTags: ['SubCategory'],
    }),
    getAllSubCategory: builder.query({
        query: () =>  `all-sub-category`,
        providesTags:['SubCategory'],
    }),
    updateSubCategory: builder.mutation({
      query: (newData) => ({
        url: `update-sub-category`,
        method: 'PUT',
        body: newData,
      }),
      invalidatesTags: ['SubCategory'],
    })
  }),
})


export const { useSubCategoryUploadeMutation , useGetAllSubCategoryQuery  , useUpdateSubCategoryMutation} = subCategoryApi