import axios from "axios";

let headers = {};
let isRefreshing = false;
let failedQueue = [];

const BASE_URL = "https://api.sucodev.com/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers,
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const rfToken = await localStorage.getItem("refresh_token");
      console.log(rfToken);
      if (rfToken) {
        try {
          const res = await axios.post(`${BASE_URL}/refresh-token`, {
            refresh_token: rfToken,
          });
          const { access_token, refresh_token } = res.data.data;
          await localStorage.setItem("token", access_token);
          await localStorage.setItem("refresh_token", refresh_token);
          isRefreshing = false;
          processQueue(null, access_token);
          return axiosInstance(originalRequest);
        } catch (error) {
          processQueue(error, null);
          return Promise.reject(error);
        }
      }
    } else {
      return new Promise((resolve, reject) => {
        processQueue(error, null);
        reject(error);
      });
    }
  }
);

export default axiosInstance;
