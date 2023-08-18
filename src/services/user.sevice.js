import axios from "axios";
import cookieParse from "./cookieparse.service";


export default class UpdateService {
  static async userUpdate(data) {
    const authKey = cookieParse()._auth;
    return await axios.put("http://localhost:8686/api/user/update", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: authKey,
          },
    });
  }

  static async getUserDetail(userId) {
    const authKey = cookieParse()._auth;
    return await axios.get(`${import.meta.env.VITE_ROOT_DOMAIN}/user/info/${userId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: authKey,
      },
    });
  }
  static async sendNewPassword(email) {
    // console.log(email);
    const data = { email: email.userEmail }
    return await axios.post(`${import.meta.env.VITE_ROOT_DOMAIN}/user/sentNewPassword`,data);
  }
}