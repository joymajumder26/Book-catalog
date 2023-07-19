import ProductReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useDeletePostMutation, useSingleBookQuery, useUpdateBookMutation } from '@/redux/feature/books/bookApi';
import { useEffect } from 'react';



import { useNavigate, useParams } from 'react-router-dom';


export default function BookDetails() {
  
  const navigate = useNavigate();

  //Temporary code, should be replaced with redux
 
  const { id } = useParams();

  const {data:book,isLoading,error,isSuccess} = useSingleBookQuery(id);


  const [deletePost,response] = useDeletePostMutation();
  const [updatedPost] = useUpdateBookMutation()
  console.log('response',response);
  // console.log(book);
  // const dispatch = useAppDispatch()
  // const onSubmit=(id: any)=>{
  //   console.log('_____________________',id);
   
  //   dispatch(deletePost(id))
  
  // }

  useEffect(() => {
   
    if (response.isSuccess) {
      (window.confirm("Are you sure to delete Book"))
      toast({
        description: 'Delete Book Successfully',
      });
      navigate('/books');
    }
  }, [response]);
 


  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300" key={id}>
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.name}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {book?.publicationDate}</p>
         
          <Button className='mr-5' onClick={() => updatedPost(book._id)}>Edit Book</Button>
          <Button onClick={() => deletePost(book._id)}>Remove Book</Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
