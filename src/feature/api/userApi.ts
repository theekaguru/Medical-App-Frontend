import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const userApi = createApi({
    reducerPath:'userApi',
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
    tagTypes: ['Users'],

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (registerPayload) => ({
                url: 'auth/register',
                method: 'POST',
                body: registerPayload
            })
        }),

        loginUser: builder.mutation({
            query: (loginPayload) => ({
                url: 'auth/login',
                method: 'POST',
                body: loginPayload
            })
        }),

        getAllUsers: builder.query({
            query: ({ page, pageSize }) => `users?page=${page}&pageSize=${pageSize}`,
            providesTags: ["Users"],
        }),

        updateUser: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        updateUserType: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `users/role/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Users']
        }),

        emailVerification: builder.mutation({
            query: (emailVerificationPayload) => ({
                url: 'auth/verify-email',
                method: 'PUT',
                body: emailVerificationPayload
            })
        }),

        getUserByUserId: builder.query({
            query:({userId})=>({
                url: `users/${userId}`,
                method: 'GET',
                providesTags: ["Users"],
            }),
            providesTags: ["Users"],

        }),

        changePassword: builder.mutation({
            query: ({ id, currentPassword, newPassword }) => ({
                url: `users/${id}/password-reset`,
                method: "PATCH",
                body: { currentPassword, newPassword },
            }),
        }),

        updateAvatar: builder.mutation({
            query: ({id, profileUrl}) => ({
                url: `users/${id}/upload-profile-pic`,
                method: "PATCH",
                body: {profileUrl},
            }),
            invalidatesTags: ["Users"],
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "auth/password-reset",
                method: 'POST',
                body: email
            })
        }),

        updatePassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `auth/reset/${token}`,
                method: "PUT",
                body: { password },
            }),
        }),
    })
})