import { useEffect, useState } from "react";
import "./Navbar.css";
import {
  Avatar,
  Button,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuPopupState from "../AddBoardButton";
import SearchIcon from "@mui/icons-material/Search";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import UserNotification from "./Notifications/Notifications";

const NavBar = () => {
  const [userName, setUserName] = useState("");
  const [userActive, setUserActive] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUserName(userInfo.userName.slice(0, 2));
    setUserActive(userInfo.authEmail);
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="nav-bar-container">
      <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
        <Link to={"/"}>
          <img
            src="data:image/png;base64,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"
            alt="Navbar Logo"
            height={"30px"}
          />
        </Link>
        <div>
          <Button
            className="navbarBtn"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Dashboard
          </Button>
          {/* <Menu
            anchorEl={anchorEl}
            className="menuItems"
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClick}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu> */}
        </div>
        <div>
          <Button
            className="navbarBtn"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Recent
          </Button>
          {/* <Menu
            anchorEl={anchorEl}
            className="menuItems"
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu> */}
        </div>
        <div>
          <Button
            className="navbarBtn"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Starred
          </Button>
        </div>
        <div>
          <Button
            className="navbarBtn"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Template
          </Button>
        </div>
        <MenuPopupState />
      </Stack>
      {/* {!userActive && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // width: "150px",
            // height: "40px",
            padding: "4px 30px",
            backgroundColor: "white",
            borderRadius: "8px",
            color: "#1a1a1a",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "uppercase",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Email not activated
        </div>
      )} */}

      <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
        <FormControl
          variant="outlined"
          style={{
            border: "1px solid hsla(213, 10%, 55%, 0.4)",
            borderRadius: "4px",
          }}
        >
          <OutlinedInput
            style={{ backgroundColor: "#22272b" }}
            id="navbar-search-field"
            startAdornment={
              <InputAdornment position="end">
                <SearchIcon style={{ color: "hsla(213, 10%, 55%, 0.4)" }} />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            placeholder="Search"
          />
        </FormControl>
        {/* <NotificationsIcon
          style={{ color: "#c7cfd8", fontSize: "18px" }}
          onClick={() => setOpenNotify(true)}
        /> */}
        <UserNotification />
        <QuestionMarkIcon style={{ color: "#c7cfd8", fontSize: "18px" }} />
        <div>
          <Avatar
            sx={{
              bgcolor: "red",
              fontSize: "12px",
              alignItems: "center",
              width: "30px",
              height: "30px",
              textTransform: "uppercase",
            }}
            onClick={handleClick}
          >
            {userName}
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            className="menuItems"
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              style={{ backgroundColor: "#1a1a1a", color: "white" }}
              component={Link}
              to="/profile"
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              style={{ backgroundColor: "#1a1a1a", color: "white" }}
              to="/updatePassword"
              onClick={handleClose}
            >
              Reset Password
            </MenuItem>
            <MenuItem
              style={{ backgroundColor: "#1a1a1a", color: "white" }}
              onClick={handleSignOut}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Stack>
    </div>
  );
};

export default NavBar;
