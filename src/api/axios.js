import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
  credentials: true,
};
axios.defaults.timeout = 10000;

export default axios;
