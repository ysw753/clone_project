import { Password } from "@mui/icons-material";
import axios from "axios";
const BASE_URL = "https://insta-backend5.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const api = axios.create({
  //baseURL: "http://localhost:5001",
  baseURL: "https://insta-backend5.herokuapp.com",
  credentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apis = {
  load: () => api.get("/api/articles?articleId=9999&size=20"),
  //load: () => api.get("/result"),
  upload: (newPost, accessToken) =>
    api.post("/api/articles", newPost, {
      headers: {
        "Content-Type": "multipart/form-data",
        credentials: true,
        Authorization: accessToken,
      },
    }),
  specificPostLoad: (postId) => api.get(`/api/articles/${postId}`, postId),
  updateSpecificPost: (postId, updateItem) =>
    api.put(`/api/articles/${postId}`, updateItem),
  deletePost: (postId) => api.delete(`/api/articles/${postId}`),

  //////////////////////////댓글관련///////////////
  createComment: (accessToken, postId, comment) =>
    api.post(`/api/articles/${postId}`, comment, {
      headers: {
        "Content-Type": "application/json",
        credentials: true,
        Authorization: accessToken,
      },
    }),
  deleteComment: (accessToken, postId, commentId) =>
    api.delete(`/api/articles/${postId}/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        credentials: true,
        Authorization: accessToken,
      },
    }),

  loadComment: (postId) =>
    api.get(`/api/articles/${postId}/comments?commentId=999999&size=20`),

  ////////////////////////대댓글 관련///////////////
  loadReply: (postId, commentId) =>
    api.get(
      `/api/articles/${postId}/comments/${commentId}/replies?replyId=15&size=20`
    ),
  createReply: (accessToken, postId, commentId, replyObj) =>
    api.post(
      `/api/articles/${postId}/comments/${commentId}/replies`,
      replyObj,
      {
        headers: {
          "Content-Type": "application/json",
          credentials: true,
          Authorization: accessToken,
        },
      }
    ),

  //////////////////////유저 관련/////////////////
  loadUsersPosts: (username, accessToken) =>
    api.get(`/api/articles/feed/${username}?articleId=9999&size=20`, {
      headers: {
        "Content-Type": "application/json",
        credentials: true,
        Authorization: accessToken,
      },
    }),
  join: (userobj) => api.post(`/api/auth/signup`, userobj),
  login: (userobj) => api.post(`/api/auth/signin`, userobj),
};
