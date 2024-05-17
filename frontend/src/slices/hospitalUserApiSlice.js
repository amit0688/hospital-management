import { apiSlice } from "./apiSlice";

const USER_URL = '/api/hospital';

export const userApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

        updateAvatar: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-avatar`,
                method: 'PUT',
                body: data,
            })
        }),
        updateImages: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-images`,
                method: 'PUT',
                body: data,
            })
        }),

        getAll: builder.query({
            query: () =>( {
                url: `${USER_URL}/getallusers`,
                method: 'GET', 
            }),
        }),

        getHos5: builder.query({
            query: () =>( {
                url: `${USER_URL}/get5`,
                method: 'GET', 
            }),
        }),

        getAllDoctors: builder.query({
            query: () =>( {
                url: `${USER_URL}/doctors`,
                method: 'GET', 
            }),
        }),

        getHospitalsByCity: builder.query({
            query: (city) =>( {
                url: `${USER_URL}/city/?city=${city}`,
                method: 'GET', 
            }),
        }),

        getHosById: builder.query({
            query: (id) =>( {
                url: `${USER_URL}/${id}`,
                method: 'GET', 
            }),
        }),

        searchHospitals: builder.query({
            query: ({ city, search }) =>( {
                url: `${USER_URL}/search/?city=${city}&search=${search}`,
                method: 'GET', 
            }),
        }),

        deleteDoctor: builder.mutation({
            query: (id) =>( {
                url: `${USER_URL}/${id}`,
                method: 'DELETE', 
            }),
        }),




    }),
});


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetAllQuery, useUpdateUserMutation, useUpdateAvatarMutation, useUpdateImagesMutation, useGetHospitalsByCityQuery, useGetHosByIdQuery,
    useSearchHospitalsQuery, useGetAllDoctorsQuery, useGetHos5Query, useDeleteDoctorMutation,
} = userApiSLice