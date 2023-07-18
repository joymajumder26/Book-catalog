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
      onSuccess: async (id, { dispatch }) => {
        // Automatically refetch the book list after successful delete
        await dispatch(bookApi.endpoints.getBooks.initiate());
      },
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
  useDeletePostMutation
} = bookApi;
