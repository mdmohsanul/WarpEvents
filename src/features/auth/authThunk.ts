import { api } from "@/api/api";
import type { UserType } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<
  UserType, // 
  { email: string; password: string; name: string }, 
  { rejectValue: string } // 
>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
   
      const response = await api.post("/auth/signup", data);
      return response.data.data as UserType;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Unauthorized");
    }
  }
);
