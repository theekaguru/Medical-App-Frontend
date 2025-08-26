import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const specializationApi = createApi({
    reducerPath: 'specializationApi',
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
    tagTypes: ['Specialization'],
    endpoints: (builder) => ({
        getAllspecializations: builder.query({
            query: ({ page, pageSize }) => ({
                url: 'specializations',
                params: { page, pageSize },
            }),
            providesTags: ['Specialization']
        }),

        createspecialization: builder.mutation({
            query: (specializationPayload) => ({
                url: 'specializations',
                method: 'POST',
                body: specializationPayload
            }),
            invalidatesTags: ['Specialization']
        }),

        updateSpecialization: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `specializations/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Specialization']
        }),

        deleteSpecialization: builder.mutation({
            query: (id: number) => ({
                url: `specializations/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Specialization'],
        }),
    })

})