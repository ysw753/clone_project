import { configureStore, combineReducers } from "@reduxjs/toolkit";

import postsReducer from "./modules/postsSlice";
import userReducer from "./modules/userSlice";

const rootReducer = combineReducers({ posts: postsReducer, myposts: userReducer, })

export const store = configureStore({ reducer: rootReducer });
