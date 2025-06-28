import axios from "axios"
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "https://warpevents-backend.onrender.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});