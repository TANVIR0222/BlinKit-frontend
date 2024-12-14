import baseUrl from '@/utils/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl()}/product/` }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    productUploade: builder.mutation({
      query: (newData) => ({
        url: `add-product`,
        method: 'POST',
        body:  newData
      }),
      invalidatesTags:['Product']
    }),
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
       `all-product?page=${page}&limit=${limit}&search=${search}`,
      providesTags:['Product']
    }),
    getProductByCategory: builder.mutation({
      query: (id) =>({
        url: `get-product-by-category`,
        method: 'POST',
        body: id
      }),
      invalidatesTags:['Product']
    }),
    getSingleProductById: builder.query({
      query: (id) => `get-single-product-by-id/${id}`,
      providesTags:['Product']
    }),
    searchProduct: builder.query({
      query: ({ search , page , limit }) => {
        // Construct query parameters dynamically
        const params = new URLSearchParams({
          ...(search && { search }),
          ...(page && { page }),
          ...(limit && { limit }),
        });
        return `search-product?${params}`;
      },
      providesTags: ['Product'],
    }),
    getSubCategoryProductById: builder.query({
      query: (id) => `get-sub-category-product-by-category/${id}`,
      providesTags:['Product']
    }),
  }),
})

export const { useProductUploadeMutation , useGetProductsQuery  , useGetProductByCategoryMutation ,useGetSingleProductByIdQuery  , useSearchProductQuery , useGetSubCategoryProductByIdQuery} = productApi