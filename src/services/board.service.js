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

  static async addColumnToBoard(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/addColumn`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async addTaskToCol(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/addTask`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateBoardTitle(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/updateBoardTitle`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateDragDrop(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/update`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateDragDropTask(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/updateDragTask`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }
  static async addUserToBoard(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/add-user`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async changeRoleUser(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/change-role`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateTaskTitle(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/updateTaskTitle`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async getTaskInfo(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/getTaskInfo`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateTaskDescription(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/updateTaskDescription`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async addFileToTask(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/addFileToTask`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async deleteFileOnTask(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/deleteFileOnTask`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async removeUserFromBoard(data) {
    const authKey = cookieParse()._auth;
    return await axios.post(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/deleteUserFromBoard`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async deleteCol(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/deleteCol`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async deleteTask(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/deleteTask`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async deleteBoard(data, user) {
    const authKey = cookieParse()._auth;
    return await axios.delete(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/delete/?id=${data}&u=${user}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async changeColName(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/changeColName`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: authKey,
        },
      }
    );
  }

  static async updateNotificationStatus(data) {
    const authKey = cookieParse()._auth;
    return await axios.patch(
      `${import.meta.env.VITE_ROOT_DOMAIN}/b/updateNotificationStatus`,
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
