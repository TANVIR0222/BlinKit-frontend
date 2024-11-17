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
    userLogin: builder.mutation({
      query: (login) => ({
        url:'login',
        method:'POST',
        body: login
      })
    }),
    userForgotPassword: builder.mutation({
      query: (forgotPassword) => ({
        url:'forgot-password',
        method:'PUT',
        body: forgotPassword
      })
    }),
    userForgotOTPVerify: builder.mutation({
      query: (forgotOTP) => ({
        url:'verify-forgoot-password-otp',
        method:'PUT',
        body: forgotOTP
      })
    }),
    userResetPassword: builder.mutation({
      query: (resetPass) => ({
        url:'rest-password',
        method:'PUT',
        body: resetPass
      })
    }),
  }),
})

export const { useUserRegisterMutation , useUserLoginMutation , useUserForgotPasswordMutation , useUserForgotOTPVerifyMutation , useUserResetPasswordMutation} = authApi