import { configureStore } from "@reduxjs/toolkit";
import { authSlice, cartSlice } from "../redux";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
