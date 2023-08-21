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
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import BoardService from "../../../../services/board.service";

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
      function timeSort(a, b) {
        return b.time - a.time;
      }
      const arrayToSet = payload.notifications.sort(timeSort);
      setUserNotifications(arrayToSet);
    });
  });

  useEffect(() => {
    UpdateService.getUserDetail(userId)
      .then((res) => {
        function timeSort(a, b) {
          return b.time - a.time;
        }
        const arrayToSet = res.data.user.notification.sort(timeSort);
        setUserNotifications(arrayToSet);
      })
      .then(() => {
        const falseCount = userNotifications.filter(
          (item) => item.status === "false"
        ).length;
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUserNotiSeen = (noti) => {
    const data = {
      message: noti.message,
      time: noti.time,
      userId: userId,
    };
    BoardService.updateNotificationStatus(data)
      .then((res) => {
        socket.emit("noti", { notifications: res.data.data.notification });
      })
      .catch((err) => console.log(err));
  };

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
        <div className="noti-count-display">
          {userNotifications.filter((item) => item.status === "false").length}
        </div>
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
          {userNotifications.length >= 1 ? userNotifications.map((noti, index) => (
            <Stack
              className="open-user-notify"
              key={index}
              direction={"row"}
              gap={1}
              onClick={() => handleUserNotiSeen(noti)}
            >
              {noti.status === "false" ? (
                <NotificationsActiveOutlinedIcon
                  style={{ color: "#fd879d" }}
                  fontSize="8px"
                />
              ) : (
                <NotificationsNoneOutlinedIcon fontSize="8px" />
              )}
              <Link to={`/b/${noti.board}`}>
                <p
                  className="noti-navigate-link"
                  style={{
                    fontWeight: noti.status === "false" ? "bold" : null,
                    color: noti.status === "false" ? "#fd879d" : "white",
                  }}
                >
                  {noti.message}
                </p>
              </Link>
            </Stack>
          )) : <p>You haven't got any notification yet!</p> }
        </div>
      </Menu>
    </div>
  );
}
