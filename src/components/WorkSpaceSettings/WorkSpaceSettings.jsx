import React, { useEffect, useState } from "react";
import NavBar from "../HomePage/Navbar/NavBar";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import SettingsWSScreen from "./SettingsWSScreen/SettingsWSScreen";
import "./WorkSpaceSettings.css";
import WorkspaceService from "../../services/workspace.service.js";
import { useParams } from "react-router-dom";
import useWorkspace from "../../store/useWorkspace";

const WorkSpaceSettings = () => {
  const { setWorkspace } = useWorkspace();
  const { id } = useParams();
  useEffect(() => {
    WorkspaceService.getWorkspaceInfo(id)
      .then((res) => {
        setWorkspace(res.data.workSpace);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
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
