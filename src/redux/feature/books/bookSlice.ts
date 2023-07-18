import { IBook } from '@/types/globalTypes';
import { Action } from '@radix-ui/react-toast';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const searchItems = (query:any) => ({
  type: 'SEARCH_ITEMS',
  payload: query,
});

const initialState = {
  books: [],
  loading: false,
  error: null,
};
export const deleteBook = createAsyncThunk<{ id: string }, { id: string, data: any }>(
  'book/deleteBook',
  async ({ id, data }) => {
    try {
      await axios.delete(`/book/${id}`, { data });
      return { id };
    } catch (error) {
      throw new Error('Failed to delete book');
    }
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    deleteUser:(state,action)=>{
      console.log('action',action);
      state.books = state.books.filter((book:any)=>book._id !== action.payload)
    }
   
  },

  extraReducers: (builder) => {
    builder
    .addCase(deleteBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      state.books = state.books.filter((book:any) => book._id !== id);
    })
    .addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const {deleteUser} = bookSlice.actions;
export default bookSlice.reducer;