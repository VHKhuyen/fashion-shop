import { requestShop } from "../utils/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const userJSON = localStorage.getItem("user");
const currentUser = userJSON ? JSON.parse(userJSON) : null;

const initialState = {
  currentUser,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //register
      .addCase(fetchRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.currentUser = action.payload.metadata.newUser;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.metadata.newUser)
        );
        state.loading = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
      })

      //login
      .addCase(fetchLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload.metadata.user;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.metadata.user)
        );
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.currentUser = null;
        state.loading = false;
      })

      //logout
      .addCase(fetchLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        state.currentUser = null;
        state.loading = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (valueForm, { rejectWithValue }) => {
    try {
      const response = await requestShop.post("/auth/register", valueForm, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (valueForm, { rejectWithValue }) => {
    try {
      const response = await requestShop.post("/auth/login", valueForm, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (userId) => {
    try {
      const response = await requestShop.get("/auth/logout", {
        withCredentials: true,
        headers: {
          "x-client-id": userId,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default authSlice.reducer;
