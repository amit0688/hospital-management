import { apiSlice } from "./apiSlice";

const USER_URL = '/api/doctor';

export const doctorApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        loginDoc: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),

        registerDoc: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),

        logoutDoc: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),

        updateUserDoc: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

        updateDocAvatar: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-avatar`,
                method: 'PUT',
                body: data,
            })
        }),

        getAllDoc: builder.query({
            query: () =>( {
                url: `${USER_URL}/getallusers`,
                method: 'GET', 
            }),
        }),

        getDoc5: builder.query({
            query: () =>( {
                url: `${USER_URL}/get5`,
                method: 'GET', 
            }),
        }),

        getDocByCity: builder.query({
            query: (city) =>( {
                url: `${USER_URL}/city/?city=${city}`,
                method: 'GET', 
            }),
        }),

        getDocById: builder.query({
            query: (id) =>( {
                url: `${USER_URL}/${id}`,
                method: 'GET', 
            }),
        }),

        searchDoctors: builder.query({
            query: ({ city, search }) =>( {
                url: `${USER_URL}/search/?city=${city}&search=${search}`,
                method: 'GET', 
            }),
        }),

        getDocAppointments: builder.query({
            query: () =>( {
                url: `${USER_URL}/appointments`,
                method: 'GET', 
            }),
        }),

        

    }),
});


export const { useLoginDocMutation, useLogoutDocMutation, useRegisterDocMutation, useGetAllDocQuery, useUpdateUserDocMutation, useGetDocByCityQuery, useGetDocByIdQuery, useUpdateDocAvatarMutation,
    useSearchDoctorsQuery, useGetDocAppointmentsQuery, useGetDoc5Query
 } = doctorApiSLice