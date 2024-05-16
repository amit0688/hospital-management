import { apiSlice } from "./apiSlice";

const USER_URL = '/api/user';

export const patientApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        loginPat: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        googleLoginPat: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/google-login`,
                method: 'POST',
                body: data,
            }),
        }),

        registerPat: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),

        googleRegisterPat: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/google-signup`,
                method: 'POST',
                body: data,
            }),
        }),

        logoutPat: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),

        updatePat: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

        updatePatAvatar: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-avatar`,
                method: 'PUT',
                body: data,
            })
        }),
        

        getAllPat: builder.query({
            query: () =>( {
                url: `${USER_URL}/getallusers`,
                method: 'GET', 
            }),
        }),

        getPatByCity: builder.query({
            query: (city) =>( {
                url: `${USER_URL}/city/?city=${city}`,
                method: 'GET', 
            }),
        }),

        getPatById: builder.query({
            query: (id) =>( {
                url: `${USER_URL}/${id}`,
                method: 'GET', 
            }),
        }),

        getAppointments: builder.query({
            query: (id) =>( {
                url: `${USER_URL}/${id}/appointments`,
                method: 'GET', 
            }),
        }),


    }),
});


export const { useLoginPatMutation, useLogoutPatMutation, useRegisterPatMutation, useGoogleRegisterPatMutation, useGoogleLoginPatMutation, useGetAllPatQuery, useUpdatePatMutation, useUpdatePatAvatarMutation, useGetPatByCityQuery, useGetPatByIdQuery,
    useGetAppointmentsQuery,
} = patientApiSLice