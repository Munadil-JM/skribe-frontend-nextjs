import api from "./api";
import TokenService from "./token.service";

class UserService {
  async get(url) {
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error;
      //throw new Error("Cannot fetch products, Server is Down!");
    }
  }

  async post(url, data) {
    try {
      const response = await api.post(url, data, {
        headers: {
          Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }

  async put(url, body) {
    try {
      const response = await api.put(url, body, {
        headers: {
          Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error;
      //throw new Error("Cannot fetch products, Server is Down!");
    }
  }

  async delete(url, data) {
    try {
      const response = await api.delete(
        url,
        { data },
        {
          headers: {
            Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
          },
        }
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
