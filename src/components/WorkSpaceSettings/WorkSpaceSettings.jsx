import React from "react";
import NavBar from "../HomePage/Navbar/NavBar";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import SettingsWSScreen from "./SettingsWSScreen/SettingsWSScreen";
import "./WorkSpaceSettings.css";

const WorkSpaceSettings = () => {
  return (
    <Stack direction={"column"} className="ws-settings-main">
      <NavBar />
      <Stack direction={"row"}>
        <SideBar />
        <SettingsWSScreen />
      </Stack>
    </Stack>
  );
};

export default WorkSpaceSettings;
