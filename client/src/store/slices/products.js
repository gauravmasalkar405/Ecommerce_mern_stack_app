import { productsRoute } from "../../api/product";
import { apiSlice } from "./api";

// Inject endpoints into the apiSlice
export const productSlice = apiSlice.injectEndpoints({
  // Define the endpoints using the builder
  endpoints: (builder) => ({
    // Define the "getProducts" endpoint
    getProducts: builder.query({
      query: () => ({
        url: productsRoute, // Set the URL for the "getProducts" endpoint
      }),
      keepUnusedDataFor: 5, // Keep the data for 5 minutes even if it's not actively used
    }),

    getProductsDetails: builder.query({
      query: (productId) => ({
        url: `${productsRoute}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// Destructure the generated query hooks from the productSlice
export const { useGetProductsQuery, useGetProductsDetailsQuery } = productSlice;
