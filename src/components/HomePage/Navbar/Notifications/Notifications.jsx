import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Notifications.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { socket } from "../../../../miscs/socket";
import UpdateService from "../../../../services/user.sevice";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

export default function UserNotification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userNotifications, setUserNotifications] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    socket.on("noti", (payload) => {
      setUserNotifications(payload.notifications.reverse());
    });
  });

  useEffect(() => {
    UpdateService.getUserDetail(userId)
      .then((res) => {
        // console.log(res.data.user.notification);
        setUserNotifications(res.data.user.notification.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(userNotifications);

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        style={{ minWidth: "fit-content" }}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="noti-count-display">{userNotifications.length}</div>
        <NotificationsIcon style={{ color: "#c7cfd8", fontSize: "18px" }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ marginTop: "8px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="noti-container">
          {userNotifications.map((noti, index) => (
            <Stack
              className="open-user-notify"
              key={index}
              direction={"row"}
              gap={1}
            >
              <NotificationsNoneOutlinedIcon fontSize="8px" />
              <Link to={`/b/${noti.board}`}>
                <p className="noti-navigate-link">{noti.message}</p>
              </Link>
            </Stack>
          ))}
        </div>
      </Menu>
    </div>
  );
}
