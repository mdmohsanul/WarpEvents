import type { EventDetails, EventType } from "@/types/event";
import { createSlice } from "@reduxjs/toolkit";
import {
  addEvent,
  fetchEventById,
  fetchEvents,
  registerForEvent,
} from "./eventThunk";

interface EventState {
  events: EventType[] | null;
  event: EventDetails | null;
  error: string | null | undefined;
  loading: boolean;
}

const initialState: EventState = {
  events: null,
  event: null,
  error: null,
  loading: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events?.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        if (state.events) {
          const index = state.events.findIndex(
            (e) => e._id === updatedEvent._id
          );
          if (index !== -1) {
            state.events[index] = updatedEvent;
          }
        }
      });
  },
});

export default eventSlice.reducer;
