import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { storage } from "../../../miscs/firebase.setup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "@mui/material/Modal";
import { Avatar, LinearProgress, Stack } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import "./TaskDetail.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import RollerShadesOutlinedIcon from "@mui/icons-material/RollerShadesOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import AutoDeleteOutlinedIcon from "@mui/icons-material/AutoDeleteOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TaskEditor from "./TaskEditor/TaskEditor";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import BoardService from "../../../services/board.service";
import useBoard from "../../../store/useBoard";
import useColumn from "../../../store/useColumn";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";
import { socket } from "../../../miscs/socket";

const style = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "40%",
  minWidth: "700px",
  bgcolor: "rgb(36 40 47 / 50%)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(6px)",
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
  const [taskTitle, setTaskTitle] = React.useState({ showButton: false });
  const [fileUpload, setFileUpload] = React.useState();
  const [attachmentsIcon, setAttachmentsIcon] = React.useState(false);
  const [message, setMessage] = React.useState({ progress: false });
  const [openModal, setOpenModal] = React.useState(false);
  const { setBoard } = useBoard();
  const { setColumn } = useColumn();

  const des = props.props.item.description;
  const columnId = props.props.columnId;
  const userName = JSON.parse(localStorage.getItem("user")).userName;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
    uploadFile(file);
  };

  const uploadFile = (file) => {
    if (!file) return;
    setMessage({ progress: true });
    const fileRef = ref(storage, `Project/${Date.now() + file.name}`);
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            const data = {
              url: url,
              name: file.name,
              type: file.type,
              taskId: props.props.item._id,
              boardId: props.props.board.boardId,
            };
            BoardService.addFileToTask(data)
              .then((res) => {
                setBoard(res.data.board);
                setColumn(res.data.board.columns);
                socket.emit("drag", { board: res.data.board });
              })
              .catch((err) => console.log(err));
            setMessage({ success: "Uploaded succesfully!", progress: false });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleEditTask = () => {
    if (taskTitle.title) {
      const originalValue = props.props.item.content;
      const boardId = props.props.board.boardId;
      const taskId = props.props.item._id;

      const data = {
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        title: taskTitle.title,
      };

      BoardService.updateTaskTitle(data)
        .then((res) => {
          setBoard(res.data.board);
          setColumn(res.data.board.columns);
          socket.emit("drag", { board: res.data.board });
        })
        .catch((err) => console.log(err));
    }
  };

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  const deleteAttachment = (url) => {
    const taskId = props.props.item._id;
    const boardId = props.props.board.boardId;
    const data = {
      taskId: taskId,
      boardId: boardId,
      url: url,
    };
    BoardService.deleteFileOnTask(data)
      .then((res) => {
        setBoard(res.data.board);
        setColumn(res.data.board.columns);
        setAttachmentsIcon(false);
        socket.emit("drag", { board: res.data.board });
      })
      .catch((err) => console.log(err));
  };

  const openTaskEditor = () => {
    setDisplayEditor(true);
  };

  return (
    <div>
      <DeleteTaskModal
        props={{ openModal, setOpenModal }}
        taskId={props.props.item._id}
        boardId={props.props.board.boardId}
      />
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
                  value={taskTitle.title}
                  style={{ all: "unset" }}
                  onChange={(e) =>
                    setTaskTitle({ title: e.target.value, showButton: true })
                  }
                  onClick={() => setTaskTitle({ showButton: true })}
                />
                {taskTitle.showButton && (
                  <Stack direction={"row"} gap={"4px"} alignItems={"center"}>
                    <CreateIcon
                      className="handle-edit-icon edit-icon"
                      style={{ color: "white", fontSize: "18px" }}
                      onClick={() => handleEditTask()}
                    />
                    <DoDisturbOnOutlinedIcon
                      className="handle-edit-icon cancel-icon"
                      style={{ color: "white", fontSize: "18px" }}
                      onClick={() =>
                        setTaskTitle({
                          title: props.props.item.content,
                          showButton: false,
                        })
                      }
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

                  {des ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: des }}
                        onClick={() => setDisplayEditor(true)}
                        style={{
                          display: displayEditor ? "none" : null,
                          paddingTop: "10px",
                        }}
                      />
                    </>
                  ) : (
                    <input
                      style={{ display: displayEditor ? "none" : null }}
                      className="task-description-box"
                      type="text"
                      placeholder="Add a more detailed description…"
                      onClick={() => setDisplayEditor(true)}
                    />
                  )}
                  <div style={{ display: displayEditor ? null : "none" }}>
                    <TaskEditor
                      setDisplayEditor={setDisplayEditor}
                      taskId={props.props.item._id}
                      boardId={props.props.board.boardId}
                    />
                  </div>
                </Stack>
              </Stack>
              {props.props && props.props.item.files
                ? props.props.item.files.map((item, index) => (
                    <Stack
                      key={index + 1}
                      direction={"row"}
                      gap={2}
                      alignItems={"center"}
                    >
                      {item.type === "image/jpeg" ||
                      item.type === "image/png" ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="uploaded-file-thumb"
                        />
                      ) : (
                        <div className="doc-file-thumb-display">.doc</div>
                      )}
                      <Stack direction={"column"} gap={1}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Stack direction={"row"} alignItems={"start"} gap={1}>
                            <h5
                              style={{
                                color: "white",
                                textDecoration: "underline",
                              }}
                            >
                              {item.name}
                            </h5>
                            <ArrowOutwardOutlinedIcon
                              style={{
                                color: "white",
                              }}
                              fontSize="11px"
                            />
                          </Stack>
                        </a>
                        <Stack direction={"row"} gap={1}>
                          <button
                            className="attachment-controller-btn"
                            onClick={() => openNewTab(item.url)}
                          >
                            Open In New Tab
                          </button>
                          <Stack direction={"row"} alignItems={"center"}>
                            <button
                              className="attachment-controller-btn"
                              onClick={() =>
                                setAttachmentsIcon({ url: item.url })
                              }
                            >
                              Delete Attachment
                            </button>
                            <CheckOutlinedIcon
                              className="dlt-attch-btn"
                              style={{
                                display:
                                  attachmentsIcon.url === item.url
                                    ? true
                                    : "none",
                              }}
                              fontSize="12px"
                              onClick={() => deleteAttachment(item.url)}
                            />
                            <ClearOutlinedIcon
                              className="dlt-attch-btn"
                              style={{
                                display:
                                  attachmentsIcon.url === item.url
                                    ? true
                                    : "none",
                              }}
                              fontSize="12px"
                              onClick={() => setAttachmentsIcon({ url: null })}
                            />
                          </Stack>
                        </Stack>
                        {/* <p>Item type: {item.type}</p> */}
                      </Stack>
                    </Stack>
                  ))
                : null}
              {/* Attachment section */}
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <AttachmentOutlinedIcon />
                <input
                  type="file"
                  className="custom-file-input"
                  name="task-attachment"
                  accept=".png,.jpeg,.jpg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => handleFileUpload(e)}
                />
              </Stack>
              {message.progress ? (
                <LinearProgress color="inherit" style={{ height: "2px" }} />
              ) : null}
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
                    <AccessTimeOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Dates
                  </div>
                </button>

                <button>
                  <div className="task-detail-func-btn">
                    <RollerShadesOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Cover
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
                <button onClick={() => setOpenModal(true)}>
                  <div className="task-detail-func-btn">
                    <AutoDeleteOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                    Delete
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
