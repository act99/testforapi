import axios from "axios";
import { getCookie } from "./Cookie";

const token = getCookie("token");
const api = axios.create({
  // 실제 베이스 유알엘
  baseURL: "http://52.79.228.83:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  login: (id, pwd) => api.post("/user/login", { username: id, password: pwd }),
  signup: (id, nickname, pwd, passwordcheck) =>
    api.post("/user/signup", {
      username: id,
      nickname: nickname,
      password: pwd,
    }),
  userInfo: (token) =>
    api.post(`/user/userinfo`, {
      authorization: token,
    }),
  add: (contents) => api.post("/api/posts", contents),
  get: () => api.get("/api/posts"),
  edit: (postID, contents) => api.put(`/api/posts/${postID}`, contents),
  delete: (postID) => api.delete(`/api/posts/${postID}`),
  imageUpload: (image) => api.post(`/api/image`, image),
  buyCount: (postId) => api.post(`/api/posts/${postId}/buycount`),
  // comment
  addComment: (postId, comment) =>
    api.post(`/api/${postId}/comments`, { comment: comment }),
  getComments: (postId) => api.get(`/api/${postId}/comments`),
  delComment: (commentId) => api.delete(`/api/comments/${commentId}`),
};
