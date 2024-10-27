import axios from 'axios'
import { API_URL } from "../../constants";
import { getCookie, removeCookie, setCookie } from "../Cookie/cookie";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  // withCredentials: true,
  // Credentialed Request 방식은 Access-Control-Allow-Origin 헤더가 *일 때 사용 불가하므로 수정!!
});

// 리퀘스트 인터셉팅
instance.interceptors.request.use(
  async (config) => {
    const token = getCookie("ACCESS_TOKEN");
    // 토큰 있으면 헤더에 토큰 삽입
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

instance.interceptors.response.use(
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
      //리프레시 토큰 가져오기
      const refreshToken = getCookie('REFRESH_TOKEN');
      //리프레시 토큰이 있다면,
      if (refreshToken) {
        //토큰 재발급 요청보내기
        return axios
          .post(
            `${API_URL}/auth/reissue`,
            {},
            { headers: { Refresh: refreshToken } }
          )
          .then((response) => {
            //받아온 토큰 저장
            const newAccessToken = response.data.data.access;
            const newRefreshToken = response.data.data.refresh;
            setCookie('ACCESS_TOKEN',newAccessToken, {});
            setCookie('REFRESH_TOKEN',newRefreshToken, {});
            //원래 요청에 새로 받은 토큰 삽입
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return instance(originalRequest);
          })
          .catch((refreshError) => {
            //재발급에서 에러나면 저장된 토큰 삭제 후 에러 반환
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
