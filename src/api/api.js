import axios from "axios";

const bkUrlLocalhost = "http://localhost:3000";
// const bkUrlRemote = "";

const api = axios.create({
  baseURL: bkUrlLocalhost,
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