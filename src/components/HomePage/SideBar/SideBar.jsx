import React, { useEffect, useState } from "react";
import "./SideBar.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import AddWorkSpaceModal from "../AddWorkSpaceModal/AddWorkSpaceModal";
import WorkspaceService from "../../../services/workspace.service.js";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";
import useWorkspaces from "../../../store/useWorkspaces.js";

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { workspaces, setWorkspaces } = useWorkspaces();

  useEffect(() => {
    WorkspaceService.getWorkspaces({
      userID: JSON.parse(localStorage.getItem("user"))._id,
    })
      .then((res) => {
        setWorkspaces(res.data.workspaces);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    
  return (
    <div className="side-bar-home">
      <AddWorkSpaceModal open={open} handleClose={handleClose} />
      <Stack gap={"20px"}>
        <Button variant="text" className="sidebar-button">
          <DashboardIcon />
          <p>Boards</p>
        </Button>
        <Button variant="text" className="sidebar-button">
          <BackupTableOutlinedIcon />
          <p>Templates</p>
        </Button>
        <Button variant="text" className="sidebar-button">
          <OtherHousesOutlinedIcon />
          <p>Home</p>
        </Button>
        <LogOut />

        <hr style={{ border: "none", borderBottom: "1px solid #c7cfd8 " }} />

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pl={1}
        >
          <p>Workspaces</p>
          <button
            type="button"
            className="add-workspace-btn"
            onClick={handleOpen}
          >
            +
          </button>
        </Stack>
        {workspaces.length > 0 && workspaces.map((row, index) => (
          <Accordion style={{ boxShadow: "none" }} key={index + 1} className="sidebar-dropdown">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ margin: 0 }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
              <Avatar
                sx={{
                  bgcolor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                  borderRadius: "10px",
                  width: "30px",
                  height: "30px",
                  fontSize: "12px",
                }}
              >
                {row.name && row.name.toUpperCase().substring(0, 2)}
              </Avatar>
              <Typography>{row.name}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails style={{ margin: "0" }}>
            <Button
              style={{
                justifyContent: "left",
                gap: "5px",
                marginBottom: "8px",
              }}
              fullWidth
            >
              <DashboardIcon style={{ color: "white", fontSize: "14px" }} />
              <Typography>Boards</Typography>
            </Button>
            <Button
              style={{
                justifyContent: "left",
                gap: "5px",
                marginBottom: "8px",
              }}
              fullWidth
              gap={"5px"}
              mb={"10px"}
            >
              <FavoriteBorderOutlinedIcon
                style={{ color: "white", fontSize: "14px" }}
              />
              <Typography>Highlights</Typography>
            </Button>
            <Button
              style={{
                justifyContent: "left",
                gap: "5px",
                marginBottom: "8px",
              }}
              fullWidth
              gap={"5px"}
              mb={"10px"}
            >
              <InterestsOutlinedIcon
                style={{ color: "white", fontSize: "14px" }}
              />
              <Typography>Views</Typography>
            </Button>
            <Link to={`/settings/${row._id}`}>
              <Button
                style={{ justifyContent: "left", gap: "5px" }}
                fullWidth
                gap={"5px"}
                mb={"10px"}
              >
                <SettingsOutlinedIcon
                  style={{ color: "white", fontSize: "14px" }}
                />
                <Typography>Settings </Typography>
              </Button>
            </Link>
          </AccordionDetails>
        </Accordion>
        ))}
        </Stack>

    </div>
  );
};

export default SideBar;
