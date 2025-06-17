import api from "./api";
import TokenService from "./token.service";

class AuthService {
  async login(username, password, browserId, otp) {
    const response = await api.post("/Authenticate/loginNew", {
      username,
      password,
      browserId,
      otp,
    });
    if (response.data.accessToken) {
      TokenService.setUser(response.data);
    }
    return response.data;
  }

  logout() {
    TokenService.removeUser();
  }

  async register(data) {
    const response = await api.post("/Authenticate/register", {
      data,
    });
    if (response) {
    }
    return response;
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService();
