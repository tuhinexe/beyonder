import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    // Add reducers here
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
