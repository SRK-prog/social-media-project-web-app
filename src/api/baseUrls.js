import axios from "axios";

export const baseUrl = axios.create({
  baseURL: process.env.REACT_APP_USER_POST_SERVICE,
});

export const chatBaseUrl = axios.create({
  baseURL: process.env.REACT_APP_CHAT_SERVICE_URL + "/api",
});
