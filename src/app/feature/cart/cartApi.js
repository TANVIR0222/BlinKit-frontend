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
      query: (id) => `single-user-cart/${id}`,
      providesTags: ["cart"],
    }),
    updateCartItemQty: builder.mutation({
      query: ({ id, qty }) => ({
        url: `single-user-cart-qty-update`, // Backend endpoint
        method: "PUT",
        body: { id, qty }, // Data to be sent in the request body
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItemQty: builder.mutation({
      query: ({ id, qty }) => ({
        url: `single-user-cart-qty-delete`, // Backend endpoint
        method: "PUT",
        body: { id, qty }, // Data to be sent in the request body
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: ({id,productId}) => ({
        url: `single-user-cart-delete/${id}`, // Backend endpoint
        method: "Delete",
        body: {productId}, // Data to be sent in the request body
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const { useDeleteCartItemMutation ,useAddToCartMutation , useGetSingleUserCartQuery  , useUpdateCartItemQtyMutation , useDeleteCartItemQtyMutation} = cartApi;
