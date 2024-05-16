import { apiSlice } from "./apiSlice";

const USER_URL = '/api/booking';


export const bookingApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        booking: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/paymentverification`,
                method: 'POST',
                body: data,
            }),
        }),
        
        checkout: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/checkout`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useBookingMutation, useCheckoutMutation } = bookingApiSLice