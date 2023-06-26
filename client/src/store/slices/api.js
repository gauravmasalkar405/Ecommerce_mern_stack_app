import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { host } from "../../api/host";

// Create a base query using the fetchBaseQuery function and provide the baseUrl from the host
const baseQuery = fetchBaseQuery({ baseUrl: host });

// Create the apiSlice using createApi function
export const apiSlice = createApi({
  baseQuery, // Set the baseQuery for the apiSlice
  tagTypes: ["Product", "Order", "User"], // Define tag types for the apiSlice
  endpoints: (builder) => ({}), // Define the endpoints for the apiSlice
});
