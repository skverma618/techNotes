import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Notes', 'Users'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    endpoints: (builder) => ({ }),
})  
