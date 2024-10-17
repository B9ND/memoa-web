import axios from "axios";
import { API_URL } from "../../constants";
import { getCookie, removeCookie, setCookie } from "../cookie/cookie";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token = getCookie("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const originalRequest = error.config;

    if (originalRequest.data instanceof FormData) {
      originalRequest.headers["Content-Type"] = "multipart/form-data";
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }

    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie('REFRESH_TOKEN');
      if (refreshToken) {
        return axios
          .post(
            `${API_URL}/auth/refresh`,
            {
              refreshToken
            }
          )
          .then((response) => {
            const newAccessToken = response.data.data.access;
            const newRefreshToken = response.data.data.refresh;
            setCookie('ACCESS_TOKEN',newAccessToken, {});
            setCookie('REFRESH_TOKEN',newRefreshToken, {});
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return instance(originalRequest);
          })
          .catch((refreshError) => {
            removeCookie('ACCESS_TOKEN');
            removeCookie('REFRESH_TOKEN');
            return Promise.reject(refreshError);
          });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
