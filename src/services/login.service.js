import axios from "axios";

export default class LoginService {
  static async userLoggegIn(data) {
    return await axios.post("http://localhost:8686/api/user/login", data);
  }
}
