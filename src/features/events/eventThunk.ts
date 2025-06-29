import { api } from "@/api/api";
import type { EventDetails, EventType } from "@/types/event";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk<
  {
    events: EventType[];
    total: number;
    totalPages: number;
    currentPage: number;
  },
  { page: number; limit: number; search?: string; sort?: "asc" | "desc" }
>(
  "events/fetchEvents",
  async (
    { page = 1, limit = 5, search = "", sort = "asc" },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search ? { search } : {}),
        ...(sort && { sort }),
      });

      const res = await api.get(`/events?${queryParams.toString()}`);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Unauthorized");
    }
  }
);


export const addEvent = createAsyncThunk<
  EventType,
  { title: string; description: string; date: string; location: string },
  { rejectValue: string }
>("events/addEvent", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/events", data);
    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Unauthorized");
  }
});

export const fetchEventById = createAsyncThunk<
  EventDetails,
  { id: string | undefined },
  { rejectValue: string }
>("events/fetchEventById", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/events/details/${id}`);
    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Unauthorized");
  }
});

export const registerForEvent = createAsyncThunk<
  EventType,
  { id: string | undefined },
  { rejectValue: string }
>("events/registerForEvent", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/events/${id}/register`);
    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Unauthorized");
  }
});
