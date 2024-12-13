import baseUrl from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/cart/` }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ id, productId }) => ({
        url: `add-cart/${id}`, // Backend endpoint
        method: "POST",
        body: { productId }, // Data to be sent in the request body
      }),
      invalidatesTags: ["cart"],
    }),
    getSingleUserCart: builder.query({
      query: () => ({
        url: "single-user-cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
  }),
});

export const { useAddToCartMutation , useGetSingleUserCartQuery } = cartApi;
