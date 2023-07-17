import ProductReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/feature/books/bookApi';


import { useParams } from 'react-router-dom';


export default function BookDetails() {
  

  //! Temporary code, should be replaced with redux
 
  const { id } = useParams();

  const {data:book,isLoading,error} = useSingleBookQuery(id);
  console.log(book);

  //! Temporary code ends here

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.name}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {book?.publicationDate}</p>
         
          <Button>Remove Book</Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
