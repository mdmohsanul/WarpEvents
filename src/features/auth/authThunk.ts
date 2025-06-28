import { api } from "@/api/api";
import type { LoginUserType, UserType } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<
  UserType,
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data.data as UserType;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Unauthorized");
  }
});

export const login = createAsyncThunk<
  LoginUserType,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginWithEmail", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  } catch (error: any) {
    
    return rejectWithValue(error?.response?.data?.message || "Unauthorized");
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/current-user");
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Unauthorized");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/logout");
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Unauthorized");
    }
  }
);