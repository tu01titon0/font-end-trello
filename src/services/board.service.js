import axios from "axios";
import cookieParse from "./cookieparse.service";

export default class BoardService {
  static async getBoardDetail(data) {
    const authKey = cookieParse()._auth;
    return await axios.get(`${import.meta.env.VITE_ROOT_DOMAIN}/b/${data}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: authKey,
      },
    });
  }
}
