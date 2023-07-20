import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  useGetBooksQuery,
  usePostAddBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';


import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddNewBook() {
  const [inputValue, setInputValue] = useState<{
    name: string;
    image: string;
    author: string;

    genre: string;
    publicationDate: string;
  }>({
    name: '',
    image: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  const { data,refetch } = useGetBooksQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  const [updateBook,{  isSuccess:upateLoading }] = useUpdateBookMutation();
  console.log(data);
  const [postAddBook, { isLoading, isError, isSuccess }] =
    usePostAddBookMutation();
  const navigate = useNavigate();
  console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    console.log(inputValue);

    const options = {
      data: inputValue,
    };
    postAddBook(options);
    setInputValue('');

    toast({
      description: 'Book Added',
    });

    // console.log(postAddBook);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    const { id, value } = event.target;

    setInputValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // setInputValue(event.target.value);
  };
  const handleUpdateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(event);
    // console.log(inputValue);

    const options = {
      id :id,
      data: inputValue,
    };
    updateBook(options);
    setInputValue('');
    

    toast({
      description: 'Update Book Added',
    });
    // console.log(setInputValue);

    // console.log(updateBook);
  };

  const handleUpdateChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    const { id, value } = event.target;

    setInputValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // setInputValue(event.target.value);
  };
  // console.log(postAddBook);
  //! Dummy Data

  const products: IBook[] = [];

  //! **

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    if (upateLoading) {
      refetch()
      navigate('/books');
    }
  }, [isSuccess,upateLoading,refetch]);

  return (
    <div
      className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary"
      key={id}
    >
      <div className="max-w-3xl w-full">
       {(!book?._id && <h1 className="mb-2">Add Book Information</h1>)}
       {(book?._id && <h1 className="mb-2">Update Book Information</h1>)}
       {(!book?._id && <form
          className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Book Name</Label>
                <Input
                  type="text"
                  id="name"
                  className="mt-2"
                  
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="author">Book Autor</Label>
                <Input
                  type="text"
                  id="author"
                  className="mt-2"
                  
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Genre</Label>
                <Input
                  type="text"
                  id="genre"
                  className="mt-2"
                  
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="name">Publication Date</Label>
                <Input
                  type="text"
                  id="publicationDate"
                  className="mt-2"
                 
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="name">Images URL</Label>

            <Textarea
             
              id="image"
              className="mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center mt-3">
           <Button type="submit">Add Book</Button>
            
          </div>
        </form>)}
       {(book?._id && <form
          className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto"
          onSubmit={handleUpdateSubmit}
        >
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Book Name</Label>
                <Input
                  type="text"
                  id="name"
                  className="mt-2"
                  // value={book?.name}
                  onChange={handleUpdateChange}
                />
              </div>
              <div>
                <Label htmlFor="author">Book Autor</Label>
                <Input
                  type="text"
                  id="author"
                  className="mt-2"
                  // value={book?.author}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Genre</Label>
                <Input
                  type="text"
                  id="genre"
                  className="mt-2"
                  // value={book?.genre}
                  onChange={handleUpdateChange}
                />
              </div>
              <div>
                <Label htmlFor="name">Publication Date</Label>
                <Input
                  type="text"
                  id="publicationDate"
                  className="mt-2"
                  // value={book?.publicationDate}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="name">Images URL</Label>

            <Textarea
              // value={book?.image}
              id="image"
              className="mt-2"
              onChange={handleUpdateChange}
            />
          </div>
          <div className="flex justify-center items-center mt-3">
            <Button type="submit">Update Book</Button>
            
          </div>
        </form>)}
      </div>
    </div>
  );
}
