import axios from "axios";
import axiosInstance from "../config/axiosInstance";

export const AuthService = {
  login: async (data) => {
    const res = await axios.post("student/sign-in", data);
    return res;
  },
  register: async (data) => {
    const res = await axios.post("student/users/sign-up", data);
    return res;
  },
  change_password: async (data) => {
    const res = await axiosInstance.post("student/users/change-password", data);
    return res;
  },
  forgot_password: async (data) => {
    const res = await axios.post("student/users/forgot-password", data);
    return res;
  },
  reset_password: async (data) => {
    const res = await axios.post("student/users/reset-password", data);
    return res;
  },
  confirm_account: async () => {
    const res = await axios.get("student/users/confirm");
    return res;
  },
  sign_in_google: async (data) => {
    const res = await axios.post("student/sign-in-google", data);
    return res;
  },
  sign_out: async () => {
    const res = await axiosInstance.post("student/sign-out");
    return res;
  },
};
