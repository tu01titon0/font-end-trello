import React, {useEffect, useState} from "react";
import NavBar from "../HomePage/Navbar/NavBar";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import SettingsWSScreen from "./SettingsWSScreen/SettingsWSScreen";
import "./WorkSpaceSettings.css";
import WorkspaceService from "../../services/workspace.service.js";
import { useParams } from "react-router-dom";

const WorkSpaceSettings = () => {
    const [workSpace, setWorkSpace] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        WorkspaceService.getWorkspaceInfo(id)
            .then((res) => {
                setWorkSpace(res.data.workSpace);
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
        <SettingsWSScreen workSpace={workSpace}  />
      </Stack>
    </Stack>
  );
};

export default WorkSpaceSettings;
