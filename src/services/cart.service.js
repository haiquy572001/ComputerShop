import axios from "axios";
import axiosInstance from "../config/axiosInstance";

export const CartService = {
  getList: async () => {
    const res = await axiosInstance.get("order/getCartItems/");
    return res;
  },
  addToCart: async (id) => {
    const res = await axiosInstance.post(`order/addToCart/${id}`);
    return res;
  },
  removeToCart: async (data) => {
    const res = await axiosInstance.delete(`order/removeFromCart/`, {
      data: data,
    });
    return res;
  },
  addOrder: async (data) => {
    const res = await axiosInstance.post(`order/makeOrder/`, data);
    return res;
  },
  getOrder: async () => {
    const res = await axiosInstance.get(`order/getOrders/`);
    return res;
  },
  getOrderDetail: async (id) => {
    const res = await axiosInstance.get(`order/getOrderDetail/${id}`);
    return res;
  },
};
