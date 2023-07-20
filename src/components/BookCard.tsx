import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
// import { removeFromCart } from '@/redux/feature/books/bookSlice';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  
  const dispatch = useAppDispatch();
 
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
