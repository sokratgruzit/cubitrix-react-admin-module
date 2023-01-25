import axios from "axios";

const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
  credentials: true,
};
axios.defaults.timeout = 10000;

export default axios;
