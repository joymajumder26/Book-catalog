import { IBook } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IBookDetails {
    books: IBook[];
    
  }
const initialState: IBookDetails = {
    books: [],
   
    
  };
const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      
      removeFromBooks: (state, action: PayloadAction<IBook>) => {
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
  
       
      },
    },
  });
  
  export const { removeFromBooks } = bookSlice.actions;
  
  export default bookSlice.reducer;
  