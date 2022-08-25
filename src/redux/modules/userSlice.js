import { createSlice } from "@reduxjs/toolkit";

const cat_url =
  "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg";

const initialState = {
  list: [
    { imageUrl: cat_url, id: "react-logo1" },
    { imageUrl: cat_url, id: "react-logo2" },
    { imageUrl: cat_url, id: "react-logo3" },
    { imageUrl: cat_url, id: "react-logo4" },
    { imageUrl: cat_url, id: "react-logo5" },
    { imageUrl: cat_url, id: "react-logo6" },
    { imageUrl: cat_url, id: "react-logo7" },
    { imageUrl: cat_url, id: "react-logo8" },
  ],
};

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postsload: (state, action) => {
      state = action.payload;
      return state;
    },
    addUserPosts: (state, action) => {
      const today = new Date();
      const milliseconds = today.getMilliseconds();
      console.log(action.payload.content);
      const obj = {
        imageUrl: cat_url,
        content: action.payload.content,
        id: milliseconds,
      };
      state = [...state.list, obj];
    },
  },
});

// Action creators are generated for each case reducer function
export const { postsload, addUserPosts } = userSlice.actions;

export default userSlice.reducer;
