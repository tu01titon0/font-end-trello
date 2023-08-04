import axios from "axios";
import cookieParse from "./cookieparse.service";

export default class AuthService {
  static async createUser(data) {
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/user/create`,
      data
    );
  }

  static async getUsers(data) {
    const authKey = cookieParse()._auth;
    return await axios.get(
      `${import.meta.env.VITE_ROOT_DOMAIN}/user/search?u=${data}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          //   "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`,
          authorization: authKey,
        },
      }
    );
  }
}
