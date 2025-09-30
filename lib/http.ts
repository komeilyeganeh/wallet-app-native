import { API_URL } from "@/config";
import axios from "axios";


export const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
