import {
  api,
  
} from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postAddBook: builder.mutation({
      query: ({ data }) => ({
        url: "/create-book",
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['create-book'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['delete-book'],
     
     
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/edit/${id}`, // Updated API URL for updating a book
        method: 'PUT', // Use the appropriate method for updating a book (PUT, PATCH, etc.)
        body: data,
      }),
      invalidatesTags: ['update-book'], // Optional: Invalidates cache tags for the "update-book" scenario
    }),
   
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});
export const {
  useGetCommentQuery,
  useGetBooksQuery,
  usePostCommentMutation,
  useSingleBookQuery,
  usePostAddBookMutation,
  useDeletePostMutation,
  useUpdateBookMutation
} = bookApi;
