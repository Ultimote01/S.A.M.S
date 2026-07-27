import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl= "https://s-a-m-s-bk.onrender.com"

const api = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true
});

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
api.interceptors.request.use((config) => {

  
  let user = localStorage.getItem("active-user");
  if (user !== 'undefined') {
    user = JSON.parse(user)
    config.headers= {...config.headers,
       'X-Custom-Header': userTimeZone,
      Authorization: `Bearer ${user?.token}`
    };
   
  }
  return config;
});

export default api;