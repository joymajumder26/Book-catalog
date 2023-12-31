import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';

import logo from '../assets/images/book-logo.png';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/feature/user/userSlice';
import { useGetBooksQuery } from '@/redux/feature/books/bookApi';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
 
  const { data: books } = useGetBooksQuery(undefined);
  console.log(books);
  

 

 
 

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    console.log('LogOut');
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img className="h-8" src={logo} alt="log" />
            </Link>
            <h3>Book Catalog</h3>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
              <Button variant="link" asChild>
                  <Link to="/search">Search and Filter</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">All Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/addnewbook">Add New Book</Link>
                </Button>
              </li>

              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {!user.email && (
                      <>
                        {' '}
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign Up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
