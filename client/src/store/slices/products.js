import { productsRoute } from "../../api/product";
import { apiSlice } from "./api";
import { uploadImageRoute } from "../../api/uploadImage";

// Inject endpoints into the apiSlice
export const productSlice = apiSlice.injectEndpoints({
  // Define the endpoints using the builder
  endpoints: (builder) => ({
    // Define the "getProducts" endpoint
    getProducts: builder.query({
      query: ({ pageNumber }) => ({
        url: productsRoute, // Set the URL for the "getProducts" endpoint
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5, // Keep the data for 5 minutes even if it's not actively used
    }),

    getProductsDetails: builder.query({
      query: (productId) => ({
        url: `${productsRoute}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (userId) => ({
        url: `${productsRoute}/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${productsRoute}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: uploadImageRoute,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${productsRoute}/${productId}`,
        method: "DELETE",
      }),
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${productsRoute}/${data.productId}/review`,
        method: "POST",
        body: data,
      }),
    }),
    invalidatesTags: ["Product"],
  }),
});

// Destructure the generated query hooks from the productSlice
export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productSlice;
