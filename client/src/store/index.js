import { configureStore } from "@reduxjs/toolkit";
import { authSlice, cartSlice, modalConfirmSlice } from "../redux";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    modalConfirm: modalConfirmSlice,
  },
});
