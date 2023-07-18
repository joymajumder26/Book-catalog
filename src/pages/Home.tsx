
import Footer from '@/layouts/Footer';
import { IBook } from '@/types/globalTypes';
import { useGetBooksQuery } from '@/redux/feature/books/bookApi';
import BookCard from '@/components/BookCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchItems } from '@/redux/feature/books/bookSlice';


export default function Home() {
  const {data,isLoading} =useGetBooksQuery(undefined);
  console.log(isLoading);
 

  return (
    <>
   <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
  <div className="col-span-12 grid grid-cols-3 gap-10 pb-20">
    {data?.data.slice(0, 10).map((book: IBook) => (
      <BookCard book={book} key={book._id} />
    ))}
  </div>
</div>

      <Footer />
    </>
  );
}
