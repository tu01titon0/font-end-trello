import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import "./SearchUser.css";
import AuthService from "../../../services/auth.service";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceService from "../../../services/workspace.service";
import useWorkspace from "../../../store/useWorkspace";

const SearchUser = () => {
  const param = useParams();
  const [input, setInput] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [focus, setFocus] = useState("none");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const { setWorkspace } = useWorkspace();

  const handleClick = () => {
    setOpen(true);
  };

  const handleErrClick = () => {
    setOpenErr(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenErr(false);
  };

  const handlerClose = () => {
    setFocus("none");
  };

  const handlerAddUser = (val) => {
    const data = {
      userId: val,
      wsId: param.id,
    };
    WorkspaceService.addUserToWorkspace(data)
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
          setWorkspace(res.data.workspace);
          handleClick();
        } else if (res.data.error) {
          setErrMessage(res.data.error);
          handleErrClick();
        }
      })
      .catch((err) => console.log(err));
    handlerClose();
  };

  const fetchUserData = (val) => {
    if (val) {
      AuthService.getUsers(val)
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUsers([]);
    }
  };

  const handleChange = (val) => {
    setFocus("block");
    if (val.length > 0) {
      setInput(val);
      fetchUserData(val);
    } else {
      setInput(undefined);
    }
  };

  return (
    <div style={{ position: "relative" }} tabIndex={0} autoFocus={true}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {errMessage}
        </Alert>
      </Snackbar>
      <div className="search-input-wrapper">
        <SearchIcon className="search-input-icons" />
        <input
          className="user-search-input"
          type="text"
          placeholder="Nhập tên người dùng muốn tìm kiếm"
          value={input}
          onInput={(e) => handleChange(e.target.value)}
        />
        <PersonSearchOutlinedIcon className="search-input-icons" />
      </div>
      <button
        className="close-search-btn"
        style={{
          display: focus,
        }}
        onClick={() => {
          handlerClose();
        }}
      >
        X
      </button>
      <div
        className="found-users-dpl"
        id="user-search-result"
        tabIndex={0}
        autoFocus={true}
        style={{ display: focus }}
        onBlur={() => {
          handlerClose();
        }}
      >
        {users.length > 0 ? (
          users.map((item, index) => (
            <button
              className="user-list-btn"
              onClick={() => handlerAddUser(item._id)}
              key={index + 1}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <img
                  src={item.avatarUrl}
                  alt="profile picture"
                  height={"20px"}
                  style={{ borderRadius: "50%" }}
                />
                {item.userName}
              </Stack>
            </button>
          ))
        ) : (
          <Typography variant="body2" sx={{ padding: "5px 20px" }}>
            Không tìm thấy người dùng nào với tên tương tự
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
