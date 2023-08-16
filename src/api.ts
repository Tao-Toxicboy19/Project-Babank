// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Floating } from './types/FloatingCrane.type';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }), // ปรับ baseUrl
    endpoints: (builder) => ({
        getLocationSlice: builder.query<Floating[], void>({
            query: () => 'getLocations', // แก้ไข endpoint ตามที่ใช้งานจริง
        }),
        addLocation: builder.mutation<void, Floating>({
            query: (newLocation) => ({
                url: 'addLocation',
                method: 'POST',
                body: newLocation,
            }),
        }),
    }),
});

export const { useGetLocationSliceQuery, useAddLocationMutation } = api;
