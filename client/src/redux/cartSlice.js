import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const setItems = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};
const initialState = {
  cartItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, color, size } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      setItems(state.cartItems);
    },

    removeItem: (state, action) => {
      const { id, color, size } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => {
          return !(
            item.id === id &&
            item.color === color &&
            item.size === size
          );
        });
        setItems(state.cartItems);
      }
    },
    removeAllItem: (state, action) => {
      state.cartItems = [];
      setItems(state.cartItems);
    },

    decrQuantity: (state, action) => {
      const { id, color, size } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) =>
            (item.id !== id && item.color) !== color && item.size !== size
        );
      }
      setItems(state.cartItems);
    },

    incrQuantity: (state, action) => {
      const { id, color, size } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );
      if (item) {
        item.quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
      setItems(state.cartItems);
    },
  },
});
export const {
  addItem,
  removeItem,
  removeAllItem,
  incrQuantity,
  decrQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
