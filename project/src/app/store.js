import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
