import axios from "axios";
import { API_KEY, API_LANGUAGE, APP_URL } from "@env";

export const APIMovies = axios.create({
  baseURL: APP_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: API_LANGUAGE,
    page: 1,
  },
});
