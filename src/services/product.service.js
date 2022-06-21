import axios from "axios";
import axiosInstance from "../config/axiosInstance";

export const ProductService = {
  getType: async () => {
    const res = await axios.get("product/getProductType/");
    return res;
  },
  getList: async (type) => {
    if (type === "All") {
      const res = await axios.get("product/getAllProduct/");
      return res;
    } else {
      const res = await axios.get(`product/getAll/${type}`);
      return res;
    }
  },
  detail: async (id) => {
    const res = await axios.get(`product/getProductDetail/${id}`);
    return res;
  },
};
