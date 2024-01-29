import axios from "axios";
import * as CONFIG from "../config";

const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
});

export default api;