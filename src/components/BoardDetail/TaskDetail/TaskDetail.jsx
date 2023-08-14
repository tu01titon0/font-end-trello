import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Stack } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import "./TaskDetail.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import RollerShadesOutlinedIcon from "@mui/icons-material/RollerShadesOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import AutoDeleteOutlinedIcon from "@mui/icons-material/AutoDeleteOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TaskEditor from "./TaskEditor/TaskEditor";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const style = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "40%",
  minWidth: "700px",
  bgcolor: "rgb(36 40 47 / 50%)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(9, 30, 66, 0.2)",
  p: "20px",
  outline: "none",
  borderRadius: "10px",
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name.userName),
    },
    children: `${name.userName.slice(0, 2)}`,
  };
}

export default function TaskDetail({ props }) {
  const handleOpen = () => props.setOpenModal(true);
  const handleClose = () => props.setOpenModal(false);
  const [displayEditor, setDisplayEditor] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [taskTitle, setTaskTitle] = React.useState({ showButton: false });

  const userName = JSON.parse(localStorage.getItem("user")).userName;

  const handleEditTask = () => {
    console.log(taskTitle.title);
  };

  const openTaskEditor = () => {
    setDisplayEditor(true);
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        style={{ overflow: "scroll" }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Header của task detail */}
          <Stack direction={"row"} gap={2} alignItems={"start"} mb={2}>
            <ListAltIcon style={{ color: "white" }} />
            <div style={{ flexGrow: 1 }}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <input
                  className="change-task-title"
                  type="text"
                  placeholder={props.props.item.content}
                  style={{ all: "unset" }}
                  onChange={(e) =>
                    setTaskTitle({ title: e.target.value, showButton: true })
                  }
                  onClick={() => setTaskTitle({ showButton: true })}
                />
                {taskTitle.showButton && (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <CreateIcon
                      style={{ color: "white", fontSize: "18px" }}
                      onClick={() => handleEditTask()}
                    />
                    <DoDisturbOnOutlinedIcon
                      style={{ color: "white", fontSize: "18px" }}
                      onClick={() => setTaskTitle({ showButton: false })}
                    />
                  </Stack>
                )}
              </Stack>
              <p style={{ fontSize: "16px" }}>
                in list{" "}
                <Link to={props.boardUrl}>{props.props.board.boardTitle}</Link>
              </p>
            </div>
          </Stack>
          {/* Kết thúc Header của task detail */}
          <Stack direction={"row"} gap={2}>
            <Stack direction={"column"} gap={2} flexGrow={1}>
              <Stack direction={"row"} gap={2} alignItems={"flex-start"}>
                <MenuIcon />
                <Stack style={{ flexGrow: 1 }} gap={1}>
                  <Typography>Description</Typography>
                  <input
                    style={{ display: displayEditor ? "none" : null }}
                    className="task-description-box"
                    type="text"
                    placeholder="Add a more detailed description…"
                    onClick={() => setDisplayEditor(true)}
                  />
                  <div style={{ display: displayEditor ? null : "none" }}>
                    <TaskEditor setDisplayEditor={setDisplayEditor} />
                  </div>
                </Stack>
              </Stack>
              {/* Activity header text */}
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <FormatListBulletedOutlinedIcon />
                <Typography>Activity</Typography>
              </Stack>
              {/* Comment section */}
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Avatar {...stringAvatar({ userName })} />
                <input
                  className="task-description-box comment-input"
                  type="text"
                  placeholder="Write a comment..."
                />
              </Stack>
            </Stack>
            <Stack dirrection="column" gap={2}>
              <div className="right-col-detail">
                <p>Add to card</p>
                <button>
                  <div className="task-detail-func-btn">
                    <PersonOutlineOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Members
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <LocalOfferOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Labels
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <ChecklistOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Checklist
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <AccessTimeOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Dates
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <AttachmentOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Attackment
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <RollerShadesOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Cover
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <TuneOutlinedIcon style={{ fontSize: "14px" }} /> Custom
                    Fields
                  </div>
                </button>
              </div>
              <div className="right-col-detail">
                <p>Actions</p>
                <button>
                  <div className="task-detail-func-btn">
                    <DriveFileMoveOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Move
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <CopyAllOutlinedIcon style={{ fontSize: "14px" }} /> Copy
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <BrandingWatermarkOutlinedIcon
                      style={{ fontSize: "14px" }}
                    />{" "}
                    Make Template
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <AutoDeleteOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Archive
                  </div>
                </button>
                <button>
                  <div className="task-detail-func-btn">
                    <ShareOutlinedIcon style={{ fontSize: "14px" }} /> Share
                  </div>
                </button>
              </div>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
