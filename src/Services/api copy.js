import axios from "axios";
import TokenService from "./token.service";
// import { createPortal } from "react-dom";
// import { useState } from "react";

const instance = axios.create({
  baseURL: "https://beta.goskribe.com/API/v1/",
  //baseURL: "https://localhost:44323/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.message === "Network Error") {
      alert("Network error. Please try again after some time.");
    }
    if (originalConfig.url !== "/Authenticate/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/Authenticate/refresh-token", {
            accessToken: TokenService.getLocalAccessToken(),
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          // .then((res) => {
          //   console.log(res)
          // }).catch((err)=>{
          //   console.log(err)
          // })

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          const { refreshToken } = rs.data;
          TokenService.updateLocalRefreshToken(refreshToken);
          return instance(originalConfig);
        } catch (_error) {
          TokenService.updateLocalAccessToken(undefined);
          TokenService.updateLocalRefreshToken(undefined);

          // console.log(_error.toJSON().message);
          // alert(_error.toJSON().message)
          alert("session has been expired");
          // window.location.href = "/";
          // return Promise.reject(_error);
        }
      }
    }

    // return Promise.reject(err);
  }
);

export default instance;
