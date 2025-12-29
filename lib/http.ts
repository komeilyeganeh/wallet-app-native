import { API_URL } from "@/config";
import axios from "axios";
import { tokenStorage } from "./storage/tokenStorage";

export const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxios.interceptors.request.use(
  async (config) => {
    try {
      const token = await tokenStorage.getToken();      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error attaching token:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
