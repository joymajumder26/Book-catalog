import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast, useToast } from '@/components/ui/use-toast';
import {
  useGetBooksQuery,
  usePostAddBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface InputValue {
  name: string;
  image: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export default function AddNewBook() {
  const [inputValue, setInputValue] = useState<InputValue>({
    name: '',
    image: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  const { data, refetch } = useGetBooksQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const { id } = useParams<{ id: string }>();
  const { data: book } = useSingleBookQuery(id);
  const [updateBook, { isSuccess: upateLoading }] = useUpdateBookMutation();
  const [postAddBook, { isLoading, isError, isSuccess }] = usePostAddBookMutation();
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log(data);
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
    setInputValue({
      name: '',
      image: '',
      author: '',
      genre: '',
      publicationDate: '',
    });

    toast({
      description: 'Book Added',
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
    const { id, value } = event.target;

    setInputValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUpdateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = {
      id,
      data: inputValue,
    };
    updateBook(options);
    setInputValue({
      name: '',
      image: '',
      author: '',
      genre: '',
      publicationDate: '',
    });

    toast({
      description: 'Update Book Added',
    });
  };

  const handleUpdateChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
    const { id, value } = event.target;

    setInputValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const products: IBook[] = [];

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    if (upateLoading) {
      refetch();
      navigate('/books');
    }
  }, [isSuccess, upateLoading, refetch]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary" key={id}>
      <div className="max-w-3xl w-full">
        {!book?._id && <h1 className="mb-2">Add Book Information</h1>}
        {book?._id && <h1 className="mb-2">Update Book Information</h1>}
        {!book?._id && (
          <form
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

              <Textarea id="image" className="mt-2" onChange={handleChange} />
            </div>
            <div className="flex justify-center items-center mt-3">
              <Button type="submit">Add Book</Button>
            </div>
          </form>
        )}
        {/* Add the form for updating book information here */}
        {book?._id && (
          <form
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
          </form>
        )}
      </div>
    </div>
  );
}
