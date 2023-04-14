import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const currentUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  currentUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //register
      // .addCase(fetchRegister.fulfilled, (state, action) => {
      //   state.isAuthenticated = true;
      // })
      // .addCase(fetchRegister.rejected, (state, action) => {
      //   state.msg = action.payload.msg;
      // })

      //login

      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.currentUser = null;
      });
  },
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (valueForm, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        valueForm
      );
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        valueForm,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/logout",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default authSlice.reducer;
