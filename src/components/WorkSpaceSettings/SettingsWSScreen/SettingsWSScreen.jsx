import React from "react";
import "./SettingsWSScreen.css";
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";

const SettingsWSScreen = () => {
  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <Stack gap={2}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Avatar
            sx={{
              backgroundColor: "green",
              width: "70px",
              height: "70px",
              borderRadius: "10px",
            }}
          >
            OP
          </Avatar>
          <div>
            <p>Board Name</p>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <LockPersonOutlinedIcon sx={{ fontSize: "12px" }} />
              <p style={{ fontSize: "14px" }}>Private</p>
            </Stack>
          </div>
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
          />
          <textarea
            className="ws-setting-input"
            name="wsBio"
            cols="30"
            rows="10"
            placeholder="Đổi thông tin Workspace"
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
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              placeholder="Nhập tên người dùng muốn tìm kiếm"
              id="ws-user-searchbar"
              endAdornment={
                <InputAdornment position="end">
                  <PersonSearchOutlinedIcon style={{ color: "white" }} />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
            />
          </FormControl>
          <p>Danh sách người dùng hiện tại</p>

          {/* Map danh sách người dùng ở đây!!! */}

          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Avatar
                sx={{
                  backgroundColor: "black",
                  minWidth: "50px",
                  minHeight: "50px",
                }}
              >
                OP
              </Avatar>
              <div>
                <h3>vanvn</h3>
                <p style={{ fontSize: "14px" }}>@vanvn123</p>
              </div>
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <p>Admin of 0 board</p>
              <button className="ws-user-btn" style={{ color: "#32cd32" }}>
                Admin
              </button>
              <button className="ws-user-btn" style={{ color: "#ff2400" }}>
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
          {/* Hết map danh sách người dùng!! */}
        </Stack>
      </Stack>
    </div>
  );
};

export default SettingsWSScreen;
