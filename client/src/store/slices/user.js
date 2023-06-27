import { apiSlice } from "./api";
import { usersRoute } from "../../api/users";

// Create a new API slice for users
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // Define a mutation for login (POST request)
      query: (data) => ({
        url: `${usersRoute}/login`, // Specify the URL for the login endpoint
        method: "POST", // Specify the HTTP method as POST
        body: data, // Pass the data as the request body
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${usersRoute}/`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${usersRoute}/logout`,
        method: "POST",
      }),
    }),
  }),
});

// Extract the generated hooks for the login mutation
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
