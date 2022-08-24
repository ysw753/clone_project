import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postsload: (state, action) => {
      state = [...action.payload];
      return state;
    },
    postsAdd: (state, action) => {
      state = [action.payload, state];
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { postsload, postsAdd } = postsSlice.actions;

export default postsSlice.reducer;
