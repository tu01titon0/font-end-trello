import React from "react";
import "./Column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "../Tasks/Tasks";
import AddTaskInput from "../AddTaskInput/AddTaskInput";

const handleAddTask = (val) => {
  // console.log("in button");
  console.log("Column ID: ", val);
};

const Column = ({ props, index, data }) => {
  return (
    <Draggable draggableId={props._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="column-display"
        >
          {/* {console.log(props)} */}
            <div
              isDragging={snapshot.isDragging}
              style={{ height: "100%", minHeight: "100%" }}
            >
              <h3
                className="column-title"
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {props.title}
              </h3>
              <Droppable
                droppableId={props._id}
                type="task"
                direction="vertical"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: "100%" }}
                  >
                  {props.tasks && props.tasks.map((item, index) => (
                      a
                      // <Tasks props={{ item, index }} key={item._id} />
                    ))}
                    {provided.placeholder}
                    {/* <button
                    className="add-task-btn"
                    onClick={() => handleAddTask(props.id)}
                  >
                    Thêm thẻ mới +
                                  </button> */}
                  <AddTaskInput props={{ props, data }} />
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
  );
};

export default Column;
