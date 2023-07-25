import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  
 
  return (
    <div>
      <div className="rounded-2xl flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link
         to={`/book-details/${book._id}`} 
         className="w-full">
          
          <h1 className="text-xl font-semibold">{book.name}</h1>
        </Link>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>

        <p className="text-sm">Pulication Date: {book.publicationDate}</p>
        
      </div>
    </div>
  );
}
