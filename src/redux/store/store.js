import { configureStore } from "@reduxjs/toolkit";
import SaginUpReducer from "../slice/SaginUpSlice";
import wishlistReducer from "../slice/wishlistSlice";
import cartReducer from "../slice/cartSlice.js";

export const store = configureStore({
  reducer: {
    saginAuth: SaginUpReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});
