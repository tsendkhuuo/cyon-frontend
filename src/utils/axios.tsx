import axios from "axios";

export const SERVER_URL = "http://localhost:8080/api";
const _axios = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default _axios;
