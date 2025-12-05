import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
<<<<<<< HEAD
import Error from './pages/Error.jsx'
=======
import SaginUp from "./pages/registers/SaginUp.jsx";

import { Provider } from 'react-redux'
import { store } from './redux/store/store'
>>>>>>> main

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './pages/Error.jsx'

// ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
<<<<<<< HEAD
    errorElement: <Error />,    
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ]
  }
=======
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "signup", element: <SaginUp /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
 
    ]
    
  },
       {
        path: "*",
        element: <Error />
      }
>>>>>>> main
]);

// RENDER
createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <RouterProvider router={router} />
);
=======
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
>>>>>>> main
