import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/user/`
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (newUser) => ({
        url:'register',
        method:'POST',
        body: newUser
      })
    }),
  }),
})

export const { useUserRegisterMutation } = authApi