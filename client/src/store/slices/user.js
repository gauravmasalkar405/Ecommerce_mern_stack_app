import { apiSlice } from "./api";
import { usersRoute } from "../../api/users";

// Create a new API slice for users
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${usersRoute}/login`,
        method: "POST",
        body: data,
        credentials: "include",
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
        credentials: "include",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${usersRoute}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: usersRoute,
        credentials: "include",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${usersRoute}/${userId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${usersRoute}/${userId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${usersRoute}/${data.userId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

// Extract the generated hooks for the login mutation
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;

// if we dont user providetags we might have to relaod the page to update its content
