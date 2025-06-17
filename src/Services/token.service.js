class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }

  getLocalRole() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role;
  }

  updateLocalAccessToken(accessToken) {
    if (!accessToken) {
      window.location.href = "/";
    }
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = accessToken;
    localStorage.setItem("user", JSON.stringify(user));
  }

  updateLocalRefreshToken(refreshToken) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.refreshToken = refreshToken;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
