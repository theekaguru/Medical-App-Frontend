import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({
         baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
        },
    }),
    tagTypes: ['Doctors'],
    endpoints: (builder) => ({
        getAllDoctors: builder.query({
            query: ({ page, pageSize }) => ({
                url: 'doctors',
                params: { page, pageSize },
            }),
            providesTags: ['Doctors']
        }),

        getUserDoctors: builder.query({
            query: ({ page, pageSize }) => ({
                url: 'users/doctors',
                params: { page, pageSize },
            }),
            providesTags: ['Doctors']
        }),

        createDoctor: builder.mutation({
            query: (doctorPayload) => ({
                url: 'doctors',
                method: 'POST',
                body: doctorPayload
            }),
            invalidatesTags: ['Doctors']
        }),

        updateDoctor: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `doctors/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Doctors']
        }),

        browseDoctors: builder.query({
            query: ({ specializationId, page = 1, pageSize = 10 }) => ({
                url: 'doctors/specialization',
                params: {
                    page,
                    pageSize,
                    specializationId,
                },
            }),
            providesTags: ['Doctors'],
        }),

        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `doctors/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Doctors']
        }),

        demoteUserFromDoctor: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `users/role/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Doctors']
        }),

    })

})