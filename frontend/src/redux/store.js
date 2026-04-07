import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./auth/authAPI.js";
import { studentAPI } from "./student/studentAPI.js";
import {adminAPI} from "./admin/adminAPI.js"
import authReducer from "./auth/authSlice.js";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [studentAPI.reducerPath]: studentAPI.reducer,
    [adminAPI.reducerPath]: adminAPI.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, studentAPI.middleware, adminAPI.middleware),
});
