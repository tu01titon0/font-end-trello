import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Tasks = ({ props }) => {
  return (
    <div style={{backgroundColor:'red', marginBottom: '20px'}}>
      {props && props.item.id ? (
        <Draggable draggableId={props.item.id} index={props.index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="tasks-display"
            >
              {console.log(props)}
              <div isDragging={snapshot.isDragging}>
                <h3
                  isDragging={snapshot.isDragging}
                  {...provided.dragHandleProps}
                >
                  {props.item.taskTitle}
                </h3>
              </div>
            </div>
          )}
        </Draggable>
      ) : null}
    </div>
  );
};

export default Tasks;
