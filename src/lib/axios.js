import axios from "axios";

const api = axios.create({
   // baseURL: import.meta.env.VITE_API_URL,
   // baseURL: 'http://localhost:4000/api'
      baseURL: 'https://backend-rpi-shop-computer-nodejs.onrender.com/api'
});

export default api;
