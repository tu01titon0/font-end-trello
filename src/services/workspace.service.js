import axios from "axios";

export default class WorkspaceService {
  static async createWorkspace(data) {
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspaces`,
      data
    );
  }
}
