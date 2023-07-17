import { IBook } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IBookDetails {
    books: IBook[];
    
  }
const initialState: IBookDetails = {
    books: [],
   
    
  };
const bookSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      postAdded(state, action) {
        state.push(action.payload)
      },
    }
  });
  
  export const { removeFromBooks } = bookSlice.actions;
  
  export default bookSlice.reducer;
  