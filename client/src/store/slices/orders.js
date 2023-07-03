import { apiSlice } from "./api";
import { ordersRoute, PAYPAL_URL } from "../../api/orders";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ordersRoute,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ordersRoute}/${orderId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ordersRoute}/${orderId}/pay`,
        method: "PUT",
        body: details,
        credentials: "include",
      }),
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: (userId) => ({
        url: `${ordersRoute}/mine/${userId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ordersRoute,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ordersRoute}/${orderId}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
