import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Notifications.css";

import { socket } from "../../../../miscs/socket";

export default function UserNotification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload);
    });
  });

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
        <MenuItem className="open-user-notify" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem className="open-user-notify" onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem className="open-user-notify" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
