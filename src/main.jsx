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
import Account from "./pages/Account.jsx";
import Login from "./pages/registers/Login.jsx"; // ✅ LOGIN IMPORT QO'SHILDI

import { Provider } from 'react-redux'
import { store } from './redux/store/store'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signup", element: <SaginUp /> },
      { path: "/login", element: <Login /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/cart", element: <Cart /> },
      { path: "/account", element: <Account /> },
    ]
  }
]);

// RENDER
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)