import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../../types/user";
import {
  
  registerUser,
 
} from "./authThunk";

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
      
  },
});

export default authSlice.reducer