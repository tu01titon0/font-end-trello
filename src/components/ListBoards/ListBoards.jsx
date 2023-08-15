import NavBar from "../HomePage/Navbar/NavBar.jsx";
import { Avatar, Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar.jsx";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined.js";
import "../WorkSpaceSettings/WorkSpaceSettings.css";
import AddIcon from "@mui/icons-material/Add";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Container } from "@mui/joy";
import * as React from "react";
import CreatBoard from "./CreatBoard.jsx";
import useWorkspace from "../../store/useWorkspace.js";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import WorkspaceService from "../../services/workspace.service.js";
const ListBoards = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { workspace, setWorkspace } = useWorkspace();
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
        <div style={{ padding: "20px", width: "1000px", margin: '0 auto' }}>
          <Stack gap={2}>
            <Stack>
              <Stack direction={"row"} gap={2}>
                <Avatar
                  sx={{
                    backgroundColor: "green",
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                  }}
                >
                  {workspace.name &&
                    workspace.name.toUpperCase().substring(0, 2)}
                </Avatar>
                <div>
                  <p>{workspace.name}</p>
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <LockPersonOutlinedIcon sx={{ fontSize: "12px" }} />
                    <p style={{ fontSize: "14px" }}>Private</p>
                  </Stack>
                </div>
              </Stack>
            </Stack>
            <hr
              style={{
                marginTop: "10px",
                marginBottom: '10px',
                border: "none",
                borderBottom: "1px solid white",
              }}
            />
          </Stack>
          <Container>
            <Stack
              direction={"row"}
              gap={"10px"}
              alignItems={"center"}
              mb={"20px"}
            >
              <PeopleOutlineIcon />
              <h6 style={{ fontSize: "24px", color: "white" }}>
                All boards in this Workspace
              </h6>
            </Stack>
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

              <CreatBoard
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
              />
            </Stack>
          </Container>
        </div>
      </Stack>
    </Stack>
  );
};

export default ListBoards;
