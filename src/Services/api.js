import axios from "axios";
export const API_URL = import.meta.env.VITE_ARK_BASE_URL;
const api = axios.create({ baseURL: API_URL, headers: { "Content-Type": "application/json" } });
export default api;
