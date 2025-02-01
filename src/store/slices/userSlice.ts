import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  user: {
    email: string;
    name: string;
    image: string;
  } | null;
};

const initialState: initialStateType = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
