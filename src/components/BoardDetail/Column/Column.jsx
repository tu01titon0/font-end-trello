import React from "react";
import "./Column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "../Tasks/Tasks";

const Column = ({ props, index }) => {
  return (
    <Draggable draggableId={props.id} index={index}>
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
            >
              {props.title}
            </h3>
            <Droppable droppableId={props.id} type="task" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: "100%" }}
                >
                  {props.tasks.map((item, index) => (
                    <Tasks props={{ item, index }} key={item.id} />
                  ))}
                  {provided.placeholder}
                  <button className="add-task-btn">Thêm thẻ mới +</button>
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