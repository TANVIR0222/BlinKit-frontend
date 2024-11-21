import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const subCategoryApi = createApi({
  reducerPath: 'subCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/subcategory/` }),
  endpoints: (builder) => ({
    subCategoryUploade: builder.mutation({
        query: (newData) => ({
            url: `add-sub-category`,
            method: 'POST',
            body: newData,
        }),
    }),
    getAllSubCategory: builder.query({
        query: () =>  `all-sub-category`,
    }),
  }),
})


export const { useSubCategoryUploadeMutation , useGetAllSubCategoryQuery } = subCategoryApi