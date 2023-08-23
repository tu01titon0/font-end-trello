import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import Avatar from "@mui/material/Avatar";
import { Button, Col, Row, Space } from "antd";
import DashboardIcon from "@mui/icons-material/Dashboard.js";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add.js";
import CreatBoard from "../../ListBoards/CreatBoard.jsx";
import useWorkspace from "../../../store/useWorkspace.js";
import WorkspaceService from "../../../services/workspace.service.js";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined.js";
import useWorkspaces from "../../../store/useWorkspaces.js";
import "./YourWorkSpace.css";

const YourWorkSpace = () => {
  // const { workspace, setWorkspace } = useWorkspace();
  const { workspaces } = useWorkspaces();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Stack direction={"row"} gap={"10px"} alignItems={"center"} mb={"20px"}>
        <WindowOutlinedIcon style={{ color: "white" }} />
        <h6 style={{ fontSize: "24px", color: "white" }}>Your Workspaces</h6>
      </Stack>
      {workspaces &&
        workspaces.map((workspace, index) => (
          <>
            <Row
              style={{
                paddingBottom: "15px",
                marginTop: "50px",
                justifyContent: "space-between",
              }}
              key={index}
            >
              {/* <Col span={8}> */}
              <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
                <Avatar
                  sx={{
                    bgcolor: `green`,
                    borderRadius: "10px",
                    width: "40px",
                    height: "40px",
                    fontSize: "14px",
                  }}
                >
                  {`${workspace.name}`.toUpperCase().substring(0, 2)}
                </Avatar>
                <Typography>{workspace.name}</Typography>
              </Stack>
              {/* </Col> */}
              {/* <Col span={8} offset={8}> */}
              {/* <Space wrap style={{textAlign: "right"}}> */}
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Link to={`/boards/${workspace._id}`}>
                  <button className="board-display-settings-icon">
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <DashboardIcon style={{ fontSize: "14px" }} />
                      <p>Boards</p>
                    </Stack>
                  </button>
                </Link>
                <Link to={`/settings/${workspace._id}`}>
                  <button className="board-display-settings-icon">
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <SettingsOutlinedIcon style={{ fontSize: "14px" }} />
                      <p>Settings</p>
                    </Stack>
                  </button>
                </Link>
              </Stack>
              {/* </Space> */}
              {/* </Col> */}
            </Row>
            <Stack direction={"row"} gap={"14px"} flexWrap={"wrap"}>
              {workspace.boards &&
                workspace.boards.map((board, index) => (
                  <button
                    key={index + 1}
                    className="recent-board-card"
                    style={{
                      backgroundImage: `
                                linear-gradient(to bottom, rgb(0 0 0 / 65%), rgb(255 255 255 / 0%)),
                                url(/${board.board.backgroundImage})`,
                    }}
                  >
                    <Link to={`/b/${board.board._id}`}>
                      <p className="board-card-title">
                        {board.board.title} | {workspace.name}
                      </p>
                    </Link>
                  </button>
                ))}
              <button
                style={{
                  textAlign: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center ",
                  backgroundImage: "none",
                  color: "gray",
                }}
                className="recent-board-card"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <p style={{ margin: "auto" }}>
                  <AddIcon />
                  <p>Tạo bảng mới</p>
                </p>
              </button>
            </Stack>
          </>
        ))}
      <CreatBoard open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
};

export default YourWorkSpace;
