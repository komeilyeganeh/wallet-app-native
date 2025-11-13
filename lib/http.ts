import { API_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

clientAxios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})
