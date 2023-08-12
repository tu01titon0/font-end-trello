import React from "react";
import "./Column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "../Tasks/Tasks";
import AddTaskInput from "../AddTaskInput/AddTaskInput";

const Column = ({ props, index, data, board }) => {
  return (
    <Draggable draggableId={props._id} index={index+1}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="column-display"
        >
          <div
            isDragging={snapshot.isDragging}
            style={{ height: "100%", minHeight: "100%" }}
          >
            <h3
              className="column-title"
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              key={props._id}
            >
              {props && props.title ? props.title : "None"}
              {/* Xử lý bất đồng bộ tại đây */}
            </h3>
            <Droppable droppableId={props._id} type="task" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: "100%" }}
                >
                  {props.tasks &&
                    props.tasks.map((item, index) => (
                      <Tasks props={{ item, index }} key={index + 1} />
                    ))}
                  {provided.placeholder}
                  <AddTaskInput props={{ props, data, board }} />
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
