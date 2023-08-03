import React from "react";
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
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";

const SideBar = () => {
  return (
    <div className="side-bar-home">
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

        <hr style={{ border: "none", borderBottom: "1px solid #c7cfd8 " }} />

        <Accordion style={{ boxShadow: "none" }} className="sidebar-dropdown">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ margin: 0 }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
              <Avatar
                sx={{
                  bgcolor: "green",
                  borderRadius: "10px",
                  width: "30px",
                  height: "30px",
                  fontSize: "12px",
                }}
              >
                BN
              </Avatar>
              <Typography>Board Name</Typography>
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
              <PeopleAltOutlinedIcon
                style={{ color: "white", fontSize: "14px" }}
              />
              <Typography>Members</Typography>
            </Button>
            <Button
              style={{ justifyContent: "left", gap: "5px" }}
              fullWidth
              gap={"5px"}
              mb={"10px"}
            >
              <SettingsOutlinedIcon
                style={{ color: "white", fontSize: "14px" }}
              />
              <Typography>Settings</Typography>
            </Button>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </div>
  );
};

export default SideBar;
