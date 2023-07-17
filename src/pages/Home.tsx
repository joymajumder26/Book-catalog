import { Button } from '@/components/ui/button';
import banner from '@/assets/images/book-banner (1).jpg';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import ProductCard from '@/components/BookCard';
import { IBook } from '@/types/globalTypes';
import { useGetBooksQuery } from '@/redux/feature/books/bookApi';
import BookCard from '@/components/BookCard';

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
