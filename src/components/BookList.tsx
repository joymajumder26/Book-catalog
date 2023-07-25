// components/BookList.js

import { useGetBooksQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';
import  { SetStateAction, useState } from 'react';
import BookCard from './BookCard';


const BookList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);

 const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreFilter = (e: { target: { value: SetStateAction<string>; }; }) => {
    setGenreFilter(e.target.value);
  };
  const handleYearFilter = (e: { target: { value: SetStateAction<string>; }; }) => {
    setYearFilter(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books</div>;
  }

  const filteredBooks = books?.data.filter((book:IBook) => {
    const titleMatch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const genreMatch = genreFilter ? book.genre.toLowerCase() === genreFilter.toLowerCase() : true;
    const yearMatch = yearFilter ? book.publicationDate === yearFilter : true;

    return (titleMatch || authorMatch) && genreMatch && yearMatch;
  });

  return (
    <div>
      <div className='mx-auto gap-10 p-10 max-w-6xl'>
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by title or author" />
        <select value={genreFilter} onChange={handleGenreFilter}>
          <option value="">All Genres</option>
          <option value="Practical and sound programming">Practical and sound programming</option>
          <option value="Coding">Coding</option>
          <option value="Love">Love</option>
          <option value="Educational">Educational</option>
          <option value="Ethical">Ethical</option>
          {/* Render genre options based on available genres */}
        </select>
        <select value={yearFilter} onChange={handleYearFilter}>
          <option value="">All Year</option>
          <option value="1997">1997</option>
          <option value="1998">1998</option>
          <option value="1999">1999</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          {/* Render genre options based on available genres */}
        </select>
      </div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative  ">
      
      <div className="col-span-12 grid grid-cols-3 gap-10 pb-20">
      {filteredBooks.map((book: IBook) => (
            <BookCard book={book} />
          ))}
      </div>
    </div>
    </div>
  );
};

export default BookList;
