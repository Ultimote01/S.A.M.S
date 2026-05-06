import axios from "axios";

const api = axios.create({
  baseURL: "https://yt-backend-1-8kek.onrender.com",
  withCredentials: true
});


api.interceptors.request.use((config) => {

  let user = localStorage.getItem("user");
  if (user !== 'undefined') {
    user = JSON.parse(user)
    config.headers.Authorization = `Bearer ${user?.tempToken}`;
  }
  return config;
});

export default api;