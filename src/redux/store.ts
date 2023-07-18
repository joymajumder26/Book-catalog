import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


import {api} from './api/apiSlice' 
import userReducer from './feature/user/userSlice'
import bookReducer from './feature/books/bookSlice'
const store = configureStore({
  reducer: {
    
    book:bookReducer,
    user : userReducer,
    [api.reducerPath] : api.reducer
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;