import axios from "axios";
import cookieParser from "./cookieparse.service";


export default class UpdateService {
  static async userUpdate(data) {
    const authKey = cookieParser()._auth;
    return await axios.put("http://localhost:8686/api/user/update", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: authKey,
          },
    });
  }
}