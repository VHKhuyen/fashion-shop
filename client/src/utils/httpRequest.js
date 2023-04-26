import axios from "axios";
export const requestShop = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
