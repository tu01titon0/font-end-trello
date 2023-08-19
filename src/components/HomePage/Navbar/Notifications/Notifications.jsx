import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Notifications.css";

import { socket } from "../../../../miscs/socket";
import UpdateService from "../../../../services/user.sevice";
import { Link } from "react-router-dom";

export default function UserNotification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userNotifications, setUserNotifications] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  React.useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload);
    });
  });

  React.useEffect(() => {
    UpdateService.getAllNotification(userId)
      .then((res) => {
        setUserNotifications(res.data.notifications);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <div className="noti-count-display">11</div>
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
        {/* {userNotifications.map(
          (item) =>
            item.notification &&
            item.notification.length > 0 &&
            item.notification.map((noti) => (
              <div className="open-user-notify" onClick={handleClose}>
                <>
                  {console.log(item)}
                  <Link className="noti-navigate-link" to={`/b/${item._id}`}>
                    {noti}
                  </Link>
                  <hr style={{marginTop: '5px'}} />
                </>
              </div>
            ))
        )} */}
      </Menu>
    </div>
  );
}
