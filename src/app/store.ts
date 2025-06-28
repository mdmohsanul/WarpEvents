import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import eventReducer from "../features/events/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;