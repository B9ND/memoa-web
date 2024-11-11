import axios from 'axios'
import { getCookie, removeCookie, setCookie } from "../Cookie/cookie";
import qs from 'qs'

const memoaAxios = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
  // withCredentials: true,
  // Credentialed Request 방식은 Access-Control-Allow-Origin 헤더가 *일 때 사용 불가하므로 수정!!
});

// 리퀘스트 인터셉팅
memoaAxios.interceptors.request.use(
  async (config) => {
    const token = getCookie("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 바디에 담은 데이터가 파일형식이면 Content-Type을 multipart/form-data
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
  (error) => {
    console.log(error);
    const originalRequest = error.config;
    // 원래요청의 바디에 담은 데이터가 파일형식이면 Content-Type을 multipart/form-data
    if (originalRequest.data instanceof FormData) {
      originalRequest.headers["Content-Type"] = "multipart/form-data";
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }
    //원래 요청이 존재하고, 재시도가 false면 실행
    if (originalRequest && !originalRequest._retry) {
      //재시도 마킹
      originalRequest._retry = true;
      const refreshToken = getCookie('REFRESH_TOKEN');
      //리프레시 토큰이 있다면, 재발급 요청
      if (refreshToken) {
        return axios
          .post(
            `${import.meta.env.VITE_API_KEY}/auth/reissue`,
            { refresh: refreshToken }
          )
          .then((response) => {
            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            setCookie('ACCESS_TOKEN',newAccessToken, {});
            setCookie('REFRESH_TOKEN',newRefreshToken, {});
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return memoaAxios(originalRequest);
          })
          .catch((refreshError) => {
            // removeCookie('ACCESS_TOKEN');
            // removeCookie('REFRESH_TOKEN');
            return Promise.reject(refreshError);
          });
      }
    }
    return Promise.reject(error);
  }
);

export default memoaAxios;
