import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/file/` }),
  endpoints: (builder) => ({
    imageUploade: builder.mutation({
        query: ({id,formData}) => ({
            url: `uploade/${id}`,
            method: 'POST',
            body: formData,
        }),
    })
  }),
})


export const { useImageUploadeMutation } = imageApi