import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../Cookie/cookie";
import qs from 'qs'
import showToast from "../toast/toast";

const memoaAxios = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

// 토큰 재발급 상태 관리
let isRefreshing = false;
let refreshSubscribers = [];

// 새로운 토큰을 받은 후 대기 중이던 요청 처리
function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// 요청을 대기열에 추가
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

memoaAxios.interceptors.request.use(
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

memoaAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.data instanceof FormData) {
      originalRequest.headers["Content-Type"] = "multipart/form-data";
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }

    // 403 / 401 에러가 발생한 경우
    if (
      originalRequest &&
      !originalRequest._retry &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      originalRequest._retry = true;
      const refreshToken = getCookie("REFRESH_TOKEN");

      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await axios.post( `${import.meta.env.VITE_API_KEY}/auth/reissue`, { refresh : refreshToken } );

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;

            setCookie("ACCESS_TOKEN", newAccessToken, { path: "/" });
            setCookie("REFRESH_TOKEN", newRefreshToken, { path: "/" });
            
            // 대기 중인 요청들을 처리
            onRefreshed(newAccessToken);

            // 재발급 완료 후 새로운 토큰으로 요청 다시 보내기
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return memoaAxios(originalRequest);
          } catch {
            // 토큰 재발급 실패 시 처리
            removeCookie("ACCESS_TOKEN");
            removeCookie("REFRESH_TOKEN");
            alert('재로그인이 필요합니다.')
            window.location.href = '/login'
          } finally {
            isRefreshing = false;
          }
        }

        // 토큰이 재발급 중이면 대기 중인 요청에 추가
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(memoaAxios(originalRequest));
          });
        });
      } else {
        // refresh token이 없는 경우 에러 처리
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default memoaAxios;