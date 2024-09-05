import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['HomeUsers'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/user/find-all',
        }),
        getHomesByUser: builder.query({
            query: (username) => `/home/find-by-user?username=${username}`,
        }),
        getUsersByHome: builder.query({
            query: (homeId) => `/user/find-by-home?homeId=${homeId}`,
            providesTags: (result, error, homeId) => [{ type: 'HomeUsers', id: homeId }],
        }),
        updateHomeUsers: builder.mutation({
            query: ({ homeId, users }) => ({
                url: '/home/update-users',
                method: 'PUT',
                body: { homeId, users },
            }),
            invalidatesTags: (result, error, { homeId }) => [{ type: 'HomeUsers', id: homeId }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetHomesByUserQuery,
    useGetUsersByHomeQuery,
    useUpdateHomeUsersMutation,
} = usersApi;
