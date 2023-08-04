import axios from "axios";
import cookieParse from "./cookieparse.service";

export default class WorkspaceService {
  static async createWorkspace(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspaces`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }
}
