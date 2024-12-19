import baseUrl from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/address/` }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (body) => ({
        url: `add-address/${body.id}`, // Replace with your actual endpoint
        method: "POST",
        body, // The address data
      }),
      invalidatesTags: ["Address"],
    }),
    getUserAddress: builder.query({
      query: (id) => `get-single-address/${id}`,
      providesTags: ["Address"],
    }),
    updateAddress : builder.mutation({
      query: ({id , ...res}) => ({
        url: `update-address/${id}`,
        method: "PUT",
        body: res,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress : builder.mutation({
      query: (id) => ({
        url: `delete-address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { useAddAddressMutation , useGetUserAddressQuery , useUpdateAddressMutation , useDeleteAddressMutation} = addressApi;
