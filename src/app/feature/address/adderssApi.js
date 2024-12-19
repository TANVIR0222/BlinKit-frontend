import baseUrl from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/address/` }),
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (body) => ({
        url: `add-address/${body.id}`, // Replace with your actual endpoint
        method: "POST",
        body, // The address data
      }),
    }),
    getUserAddress: builder.query({
      query: (id) => `get-single-address/${id}`,
    }),
    updateAddress : builder.mutation({
      query: ({id , ...res}) => ({
        url: `update-address/${id}`,
        method: "PUT",
        body: res,
      }),
    }),
   
  }),
});

export const { useAddAddressMutation , useGetUserAddressQuery , useUpdateAddressMutation } = addressApi;
