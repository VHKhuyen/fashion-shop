import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  item: null,
};

const modalConfirmSlice = createSlice({
  name: "modalConfirm",
  initialState,
  reducers: {
    open: (state, action) => {
      state.status = true;
      state.item = action.payload.item;
    },
    close: (state) => {
      state.status = false;
    },
  },
});
export const { open, close } = modalConfirmSlice.actions;

export default modalConfirmSlice.reducer;
