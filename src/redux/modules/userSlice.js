import { createSlice } from "@reduxjs/toolkit";

const cat_url = "https://s.keepmeme.com/files/en_posts/20200908/blurred-surprised-cat-meme-5b734a45210ef3b6657bcbe2831715fa.jpg";

const initialState = {
  list: [
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
    {imageUrl: cat_url, id: 'react-logo'},
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
  },
});

// Action creators are generated for each case reducer function
export const { postsload } = userSlice.actions;

export default userSlice.reducer;
