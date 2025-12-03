import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Signup from './pages/registers/Signup'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
      path: "/about",
    element: <About/>,
    },
    {
      index:true,
    element: <Home/>,
    },
    {
      path: "/contact",
    element: <Contact/>,
    },
    {
      path: "/signup",
    element: <Signup/>,
    },
    {
      path: "/wishlist",
    element: <Wishlist/>,
    },
    {
      path: "/cart",
    element: <Cart/>,
    },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
