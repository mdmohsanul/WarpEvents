import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../../types/user";
import { checkAuth, login, logoutUser, registerUser } from "./authThunk";

interface AuthState {
  user: UserType | null;
  registeredUsers: UserType[] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  registeredUsers: [],
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);
        Object.assign(state, {
          loading: false,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          isAuthenticated: true,
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        Object.assign(state, {
          loading: false,
          user: action.payload.data,
          isAuthenticated: true,
        });
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer