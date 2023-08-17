import React, { useState } from "react";
import "./Column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "../Tasks/Tasks";
import AddTaskInput from "../AddTaskInput/AddTaskInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Column = ({ props, index, data, board }) => {
  const [popup, setPopup] = useState();
  const columnId = props._id;

  const handleColumnSetting = () => {
    if (!popup) {
      setPopup(columnId);
    } else {
      setPopup(null);
    }
  };

  return (
    <Draggable
      type="column"
      draggableId={props._id}
      index={index}
      key={props._id}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="column-display"
        >
          <section
            isDragging={snapshot.isDragging}
            style={{ height: "100%", minHeight: "100%" }}
          >
            <Stack
              direction={"row"}
              alignItems={"start"}
              justifyContent={"space-between"}
            >
              <h3
                className="column-title"
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                key={props._id}
              >
                {props && props.title ? props.title : "None"}
              </h3>
              <div style={{ position: "relative" }}>
                {popup ? (
                  <CloseIcon
                    className="edit-col-title"
                    onClick={() => handleColumnSetting()}
                  />
                ) : (
                  <MoreHorizIcon
                    className="edit-col-title"
                    onClick={() => handleColumnSetting()}
                  />
                )}
                <div
                  className="col-settings-popup"
                  style={{ display: popup === columnId ? null : "none" }}
                >
                  <button className="column-settings-btn">
                    <Stack direction={"row"} alignItems={"center"} gap={"6px"}>
                      <DriveFileRenameOutlineIcon fontSize="12px" />
                      Edit Column Name
                    </Stack>
                  </button>
                  <button className="column-settings-btn">
                    <Stack direction={"row"} alignItems={"center"} gap={"6px"}>
                      <DeleteOutlinedIcon fontSize="12px" />
                      Delete Column
                    </Stack>
                  </button>
                </div>
              </div>
            </Stack>
            <Droppable droppableId={props._id} type="task" direction="vertical">
              {(provided) => (
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="content-scroll-bar"
                    style={{ minHeight: "100%" }}
                  >
                    {props.tasks &&
                      props.tasks.map((item, index) => (
                        <Tasks
                          props={{ item, index, board, data, columnId }}
                          key={item._id}
                        />
                      ))}
                    {provided.placeholder}
                    <AddTaskInput props={{ props, data, board }} />
                  </div>
                </>
              )}
            </Droppable>
          </section>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
