import { configureStore } from "@reduxjs/toolkit";
import SaginUpReducer from "../slice/SaginUpSlice";

export const store = configureStore({
  reducer: {
    saginAuth: SaginUpReducer,
  },
});