import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import SaginUp from "./pages/registers/SaginUp.jsx";

import { Provider } from 'react-redux'
import { store } from './redux/store/store'

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
]);

// RENDER
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
