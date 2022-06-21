import axios from "axios";
import axiosInstance from "../config/axiosInstance";

export const AuthService = {
  login: async (data) => {
    const res = await axios.post("user/login/", data);
    return res;
  },
  register: async (data) => {
    const res = await axios.post("user/register/", data);
    return res;
  },
  getInfo: async () => {
    const res = await axiosInstance.get("user/getUserInfor/");
    return res;
  },
  updateInfo: async (data) => {
    const res = await axiosInstance.post("user/updateUserInfor/", data);
    return res;
  },
  refreshToken: async (data) => {
    const res = await axiosInstance.post("user/token/refresh/", data);
    return res;
  },
};
