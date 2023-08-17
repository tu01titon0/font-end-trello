import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Button, Stack, Typography } from "@mui/material";
import "./BoardDisplay.css";

const RecentBoard = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Stack direction={"row"} gap={"10px"} alignItems={"center"} mb={"20px"}>
        <AccessTimeOutlinedIcon style={{color:'white'}} />
        <h6 style={{ fontSize: "24px" , color:'white'}}>Recently viewed</h6>
      </Stack>
      <Stack direction={"row"} gap={"20px"} flexGrow={"1"}>
        <button className="recent-board-card">Agile Board Template | Trello</button>
        <button className="recent-board-card">Agile Board Template | Trello</button>
        <button className="recent-board-card">Agile Board Template | Trello</button>
        <button className="recent-board-card">Agile Board Template | Trello</button>
      </Stack>
    </div>
  );
};

export default RecentBoard;
