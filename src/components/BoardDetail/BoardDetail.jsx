import React, { useState } from "react";
import Column from "./Column/Column";
import data2 from "./MockData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./BoardDetail.css";

const BoardDetail = () => {
  const [store, setStore] = useState(data2);

  const handleDragEnd = (res) => {
    const startingIndex = res.source.index;
    const startingCol = res.source.droppableId;
    const typeOfItem = res.type;
    const endingIndex = res.destination.index;
    const endingCol = res.destination.droppableId;
    console.log(
      "Starting Index: ",
      startingIndex,
      "\n",
      "Starting Column: ",
      startingCol,
      "\n",
      "Type: ",
      typeOfItem,
      "\n",
      "Ending Index: ",
      endingIndex,
      "\n",
      "Ending Col: ",
      endingCol,
      "\n"
    );
    if (typeOfItem === "column") {
      const removedData = store.splice(startingIndex, 1);
      const newData = store.splice(endingIndex, 0, removedData[0]);
      setStore(store);
      console.log(data2);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="board-container"
            >
              {store.map((item, index) => (
                <Column props={item} key={item.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default BoardDetail;
