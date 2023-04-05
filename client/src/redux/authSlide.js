import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadUser, loginUser, registerUser } from "../services/authServices";
const statusAuthFromLocalStorage = localStorage.getItem("user") ? true : false;
const LOCAL_STORAGE_TOKEN_NAME = "user";

const initialState = {
  authLoading: false,
  isAuthenticated: statusAuthFromLocalStorage,
  msg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    },
  },
  extraReducers: (builder) => {
    builder

      //register
      .addCase(fetchRegister.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          state.msg = action.payload.msg;
        }
        state.authLoading = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.authLoading = false;
      })

      //loadUser
      .addCase(fetchLoadUser.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(fetchLoadUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
        state.authLoading = false;
      })
      .addCase(fetchLoadUser.rejected, (state, action) => {
        state.authLoading = false;
      })

      //login
      .addCase(fetchLogin.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          state.msg = action.payload.msg;
        }
        state.authLoading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.authLoading = false;
      });
  },
});
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (valueForm) => {
    const response = await registerUser(valueForm);
    return response;
  }
);

export const fetchLoadUser = createAsyncThunk(
  "auth/fetchLoadUser",
  async () => {
    const response = await loadUser();
    return response;
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (valueForm) => {
    const response = await loginUser(valueForm);
    return response;
  }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
