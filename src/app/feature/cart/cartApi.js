import baseUrl from "@/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/cart/` }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ id, productId }) => ({
        url: `add-cart/${id}`, // Backend endpoint
        method: "POST",
        body: { productId }, // Data to be sent in the request body
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
