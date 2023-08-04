import axios from "axios";
import cookieParse from "./cookieparse.service";

const authKey = cookieParse()._auth;

export default class WorkspaceService {
  static async createWorkspace(data) {
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspaces`,
      data,
      {
        headers: {
          "content-type": "text/json",
          authorization: authKey,
        },
      }
    );
  }
}
