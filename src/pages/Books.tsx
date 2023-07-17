import BookCard from '@/components/BookCard';


import { useToast } from '@/components/ui/use-toast';
import { useGetBooksQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';



export default function Books() {
  const {data,isLoading} =useGetBooksQuery(undefined);
  console.log("--------------------------------------------------------------",data);
  // console.log(isLoading);

  const { toast } = useToast();

  

  //! Dummy Data



  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };




  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative  ">
      
      <div className="col-span-12 grid grid-cols-3 gap-10 pb-20">
      {data?.data.map((book: IBook) => (
            <BookCard book={book} />
          ))}
      </div>
    </div>
  );
}
