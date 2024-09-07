import axios from "axios";
import { cookies } from "../features/auth/authSlice";

const JWT = "jwt_authorization";

const TOKEN = cookies.get(JWT);
// create axios instance with default config containing auth header
const instance = axios.create({
  baseURL: `http://localhost8080/api`,

  headers: { Authorization: `Bearer ${TOKEN}` },
});

export default instance;
