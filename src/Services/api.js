import axios from "axios";
import TokenService from "./token.service";
import userService from "./user.service";
import authService from "./auth.service";

const instance = axios.create({
  //baseURL: "https://localhost:44323/v1",

  baseURL: process.env.NEXT_PUBLIC_PREFIX_URL_V1,
  // baseURL: "https://www.goskribe.com/API/v1",

  headers: {
    "Content-Type": "application/json",
    "X-Source-App": "FrontendApp",
  },
});

let isRefreshing = false;
let refreshAccessTokenPromise;

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
    if (err?.response?.data?.status === "MultipleLogin") {
      userService
        .post(`Authenticate/logout`, "")
        .then((res) => {})
        .catch(() => {});
      authService.logout();
      alert(
        "You have logged in from another device, and as a result, your session on this device will be automatically logged out. Please log in again if you wish to continue using this device."
      );
      window.location.href = "/";
    }
    if (err.message === "Network Error") {
      alert("Network error. Please try again after some time.");
    }
    if (originalConfig.url !== "/Authenticate/loginNew" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const rs = await instance.post("/Authenticate/refresh-token", {
              accessToken: TokenService.getLocalAccessToken(),
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken, refreshToken } = rs.data;
            TokenService.updateLocalAccessToken(accessToken);
            TokenService.updateLocalRefreshToken(refreshToken);
            isRefreshing = false;
            refreshAccessTokenPromise = null;
            // Retry the original request
            return instance(originalConfig);
          } catch (_error) {
            isRefreshing = false;
            refreshAccessTokenPromise = null;
            TokenService.updateLocalAccessToken(undefined);
            TokenService.updateLocalRefreshToken(undefined);
            //navigate('/');
            alert(
              "You have been logged out due to inactivity. Please log in again to continue."
            );
            window.location.href = "/login";
            return Promise.reject(_error);
          }
        } else {
          // If a token refresh is already in progress, wait for it to complete
          if (!refreshAccessTokenPromise) {
            refreshAccessTokenPromise = new Promise((resolve, reject) => {
              const checkRefreshStatus = setInterval(() => {
                if (!isRefreshing) {
                  clearInterval(checkRefreshStatus);
                  resolve(instance(originalConfig));
                }
              }, 100);
            });
          }
          return refreshAccessTokenPromise;
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
