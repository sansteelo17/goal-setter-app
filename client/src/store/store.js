import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import goalReducer from "./goal-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
