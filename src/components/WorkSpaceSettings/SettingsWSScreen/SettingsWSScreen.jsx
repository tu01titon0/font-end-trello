import React, { useEffect } from "react";
import "./SettingsWSScreen.css";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import WorkspaceService from "../../../services/workspace.service";
import useAlert from "../../../store/useAlert";
import useWorkspace from "../../../store/useWorkspace";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1d2125",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const SettingsWSScreen = () => {
  const wsId = useParams();
  const [open, setOpen] = React.useState(false);
  const [suceesMess, setSuccessMess] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState({
    status: false,
    name: null,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClodeDelete = () => setOpenDelete({ status: false });
  const { workspace, setWorkspace } = useWorkspace();
  const workSpace = workspace;
  const navigate = useNavigate();

  const [openDltUser, setOpenDltUser] = React.useState({ status: false });

  const closeDltUser = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDltUser({ status: false });
  };

  const { setMessage } = useAlert();

  const handleDeleteWS = () => {
    handleOpen();
  };

  const deleteWs = () => {
    WorkspaceService.deleteWorkspace(workSpace._id)
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (val, name) => {
    setOpenDelete({ status: true, name: name, value: val });
  };

  const removeUser = (user) => {
    WorkspaceService.removeUserFromWS(user, wsId.id)
      .then((res) => {
        setOpenDltUser({ status: true });
        setWorkspace(res.data.workspace);
      })
      .catch((err) => console.log(err));
    handleClodeDelete();
  };

  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <Snackbar
        open={openDltUser.status}
        autoHideDuration={6000}
        onClose={closeDltUser}
      >
        <Alert onClose={closeDltUser} severity="success" sx={{ width: "100%" }}>
          Xóa thành công người dùng khỏi Workspace
        </Alert>
      </Snackbar>
      <Modal
        open={openDelete.status}
        onClose={handleClodeDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc muốn xóa người dùng {openDelete.message} ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Người dùng bị xóa sẽ không thể truy cập lại vào workspace.
          </Typography>
          <Stack direction={"row"} gap={2} justifyContent={"center"} p={"10px"}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => removeUser(openDelete.value)}
            >
              Xóa
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleClodeDelete}
            >
              Quay lại
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc muốn xóa workspace này?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Xóa Workspace sẽ xóa toàn bộ board cùng các task và thành viên bên
            trong!
          </Typography>
          <Stack direction={"row"} gap={2} justifyContent={"center"} p={"10px"}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={deleteWs}
            >
              Xóa
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleClose}
            >
              Quay lại
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Stack gap={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Avatar
              sx={{
                backgroundColor: "green",
                width: "70px",
                height: "70px",
                borderRadius: "10px",
              }}
            >
              {workSpace.name && workSpace.name.toUpperCase().substring(0, 2)}
            </Avatar>
            <div>
              <p>{workSpace.name}</p>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <LockPersonOutlinedIcon sx={{ fontSize: "12px" }} />
                <p style={{ fontSize: "14px" }}>Private</p>
              </Stack>
            </div>
          </Stack>
          <button className="delete-ws-btn" onClick={handleDeleteWS}>
            <Typography
              sx={{
                color: "#ff2400 !important",
                "&:hover, &:active, &:focus": { color: "white !important" },
              }}
            >
              Xóa Nhóm
            </Typography>
          </button>
        </Stack>
        <hr
          style={{
            marginTop: "10px",
            border: "none",
            borderBottom: "1px solid #1a1a1a",
          }}
        />
        <Typography variant="h6">Thay đổi thông tin Workspace</Typography>
        <Stack direction={"column"} gap={2}>
          <p>Đổi tên Workspace</p>
          <input
            className="ws-setting-input"
            type="text"
            name="wsName"
            style={{ height: "38px" }}
            placeholder="Đổi tên Workspace"
            value={workSpace.name}
          />
          <textarea
            className="ws-setting-input"
            name="wsBio"
            cols="30"
            rows="10"
            placeholder="Đổi thông tin Workspace"
            value={workSpace.bio}
          ></textarea>
          <button className="ws-settings-update-btn">
            Cập nhật thông tin Workspace
          </button>
        </Stack>
        <hr
          style={{
            marginTop: "10px",
            border: "none",
            borderBottom: "1px solid #1a1a1a",
          }}
        />
        <Typography variant="h6">Thay đổi người dùng Workspace</Typography>
        <Stack direction={"column"} gap={2}>
          <p>Tìm người dùng</p>

          <SearchUser />

          <p>Danh sách người dùng hiện tại</p>

          {/* Map danh sách người dùng ở đây!!! */}
          {workSpace.users &&
            workSpace.users.map((row, index) => (
              <div key={index + 1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <Avatar
                      sx={{
                        backgroundColor: "black",
                        minWidth: "50px",
                        minHeight: "50px",
                      }}
                    >
                      {row.idUser.fullName &&
                        row.idUser.fullName.toUpperCase().substring(0, 2)}
                    </Avatar>
                    <Stack>
                      <h3>{row.idUser.fullName}</h3>
                      <p style={{ fontSize: "12px" }}>@{row.idUser.userName}</p>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                    <p>Admin of 0 board</p>
                    <button
                      className="ws-user-btn"
                      style={{ color: "#32cd32" }}
                    >
                      {row.role}
                    </button>
                    <button
                      className="ws-user-btn"
                      style={{ color: "#ff2400" }}
                      onClick={() =>
                        deleteUser(row.idUser._id, row.idUser.userName)
                      }
                    >
                      Remove User
                    </button>
                  </Stack>
                </Stack>
                <hr
                  style={{
                    marginTop: "10px",
                    border: "none",
                    borderBottom: "1px solid #1a1a1a",
                  }}
                />
              </div>
            ))}
          {/* Hết map danh sách người dùng!! */}
        </Stack>
      </Stack>
    </div>
  );
};

export default SettingsWSScreen;
