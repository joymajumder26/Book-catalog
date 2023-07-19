import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
// import Products from '@/pages/Books';

import Signup from '@/pages/Signup';


import BookDetails from '@/pages/BookDetails';
import Books from '@/pages/Books';
import AddNewBook from '@/pages/AddNewBook';
import PrivateRoute from './PrivateRoute';
import BookList from '@/components/BookList';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/search',
        element: <BookList />,
      },
      {
        path: '/book-details/:id',
        element:(
          <PrivateRoute>
           
          <BookDetails />
        </PrivateRoute>
        ),
      },
      {
        path: '/addnewbook',
        element:(
          <PrivateRoute>
           
          <AddNewBook />
        </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
