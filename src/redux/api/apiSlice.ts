import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-catalog-server-gray.vercel.app/' }),
  tagTypes:['comments',"create-book","delete-book",'update-book','books'],
  endpoints: () => ({})

})