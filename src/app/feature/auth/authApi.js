import baseUrl from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/user/` }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    
      invalidatesTags: ["User"],
    }),
    userLogin: builder.mutation({
      query: (login) => ({
        url: "login",
        method: "POST",
        body: login,
      }),
      invalidatesTags: ["User"],

    }),
    userForgotPassword: builder.mutation({
      query: (forgotPassword) => ({
        url: "forgot-password",
        method: "PUT",
        body: forgotPassword,
      }),
      invalidatesTags: ["User"],

    }),
    userForgotOTPVerify: builder.mutation({
      query: (forgotOTP) => ({
        url: "verify-forgoot-password-otp",
        method: "PUT",
        body: forgotOTP,
      }),
      invalidatesTags: ["User"],

    }),
    userResetPassword: builder.mutation({
      query: (resetPass) => ({
        url: "rest-password",
        method: "PUT",
        body: resetPass,
      }),
      invalidatesTags: ["User"],

    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    userImageUpdate: builder.mutation({
      query: ({id,formData}) => ({
        url: `uploade-image/${id}`,
        method: "PUT",
        body: formData
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserForgotPasswordMutation,
  useUserForgotOTPVerifyMutation,
  useUserResetPasswordMutation,
  useUserLogoutMutation,
  useUserImageUpdateMutation
} = authApi;
