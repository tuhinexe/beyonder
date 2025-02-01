import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  currentOrg: {
    name: string;
    url: string;
    description: string;
    links: string[];
    metaTags: Record<string, string>;
  } | null;
  user: {
    email: string;
    name: string;
    image: string;
  } | null;
};

const initialState: initialStateType = {
  user: null,
  currentOrg: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentOrg: (state, action) => {
      state.currentOrg = action.payload;
    },
  },
});

export const { setUser, setCurrentOrg } = user.actions;

export default user.reducer;
