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

  static async getWorkspaces(data) {
    const authKey = cookieParse()._auth;
    return await axios.get(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspaces/${data.userID}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async getWorkspaceInfo(data) {
    const authKey = cookieParse()._auth;
    return await axios.get(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspace/${data}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async addUserToWorkspace(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspace/adduser`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async deleteWorkspace(data) {
    const authKey = cookieParse()._auth;
    return await axios.delete(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspace/delete/${data}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async removeUserFromWS(user, ws) {
    const authKey = cookieParse()._auth;
    return await axios.delete(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspace/rmuser?w=${ws}&u=${user}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }
  static async changeUserPermission(user, ws, role) {
    const authKey = cookieParse()._auth;
<<<<<<< HEAD
=======
    // console.log(
    //   `${
    //     import.meta.env.VITE_ROOT_DOMAIN
    //   }/workspace/updateUser?w=${ws}&u=${user}&r=${role}`
    // );
>>>>>>> f817601fca5b349b04b63decd631425b07fd9703
    return await axios.put(
      `${
        import.meta.env.VITE_ROOT_DOMAIN
      }/workspace/updateUser?w=${ws}&u=${user}&r=${role}`,
      null,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateWorkspace(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/workspace/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async createBoard(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(`${import.meta.env.VITE_ROOT_DOMAIN}/board`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: authKey,
      },
    });
  }
}
