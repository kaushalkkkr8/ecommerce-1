import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{createBrowserRouter,RouterProvider} from 'react-router-dom'
import WishList from './pages/WishList';
import CartPage from './pages/CartPage';

import { Provider } from 'react-redux';
import store from './app/store';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetail';
import Order from './pages/Order';

const router= createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: "/wishlist",
    element:<WishList/>
  },
  {
    path: "/cart",
    element:<CartPage/>
  },
  {
    path:'/allcategory',
    element:<CategoryPage/>
  },
  {
    path:'/allcategory/:id',
    element:<ProductDetailPage/>
  },
  {
    path:'/order',
    element:<Order/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>

  </React.StrictMode>
);


