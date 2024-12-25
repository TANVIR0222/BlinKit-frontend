import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/order/` }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    cashOnDelivery: builder.mutation({
      query: (body) => ({
        url: `cash-on-delivery/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    onlinePayment: builder.mutation({
      query: (body) => ({
        url: `checkout/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    orderDetails: builder.query({
      query: (id) => `order-details/${id}`,
      invalidatesTags: ["Order"],
    }),
  }),
})


export const { useCashOnDeliveryMutation , useOnlinePaymentMutation , useOrderDetailsQuery } = orderApi