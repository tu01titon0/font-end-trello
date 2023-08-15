import { Stack, Typography } from "@mui/material";
import React from "react";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";

const YourWorkSpace = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Stack direction={"row"} gap={"10px"} alignItems={"center"} mb={"20px"}>
        <WindowOutlinedIcon style={{ color: "white" }} />
        <h6 style={{ fontSize: "24px", color: "white" }}>Your Workspaces</h6>
      </Stack>
      <Stack direction={"row"} gap={"20px"} flexWrap={"wrap"}>
        <button className="recent-board-card">
          Agile Board Template | Trello
        </button>
        <button className="recent-board-card">
          Agile Board Template | Trello
        </button>
        <button className="recent-board-card">
          Agile Board Template | Trello
        </button>
        <button className="recent-board-card">
          Agile Board Template | Trello
        </button>
        <button className="recent-board-card">
          Agile Board Template | Trello
        </button>
      </Stack>
    </div>
  );
};

export default YourWorkSpace;
