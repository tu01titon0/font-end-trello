import React, { useEffect, useState, useRef } from "react";
import Column from "./Column/Column";
import data2 from "./MockData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./BoardDetail.css";
import AddColumnBtn from "./AddColumnInput/AddColumnInput";
import NavBar from "../HomePage/Navbar/NavBar";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import ScrollContainer from "react-indiana-drag-scroll";
import { useParams } from "react-router";
import BoardService from "../../services/board.service";
import useBoard from "../../store/useBoard";

const BoardDetail = () => {
  const [store, setStore] = useState(data2);
  // const [board, setBoard] = useState();
  const { board, setBoard } = useBoard();
  const [column, setColumn] = useState();
  const boardId = useParams().id;

  const boardRef = useRef(board);
  const columnRef = useRef(column);

  useEffect(() => {
    boardRef.current = board;
    columnRef.current = column;
  }, [board, column]);

  useEffect(() => {
    BoardService.getBoardDetail(boardId)
      .then((res) => {
        setBoard(res.data.board);
        setColumn(res.data.board.columns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardId]);

  const backgroundStyle = (board) => ({
    backgroundImage: board
      ? `url("../../../public/${board.backgroundImage}")`
      : "none",
  });

  const handleDragEnd = (res) => {
    const startingIndex = res.source.index;
    const startingCol = res.source.droppableId;
    const typeOfItem = res.type;
    const endingIndex = res.destination.index;
    const endingCol = res.destination.droppableId;

    if (typeOfItem === "column") {
      const boardColData = [...board.columns];
      const [removedCol] = boardColData.splice(startingIndex, 1);
      boardColData.splice(endingIndex, 0, removedCol);
      setColumn(boardColData);
      const dataToBe = boardColData.map((item) => item._id);
      const dataToSend = {
        board: boardRef.current._id,
        array: dataToBe,
      };
      BoardService.updateDragDrop(dataToSend)
        .then((res) => {
          setBoard(res.data.board);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (typeOfItem === "task") {
      const newData = [...store];
      const startedColumn = newData.findIndex(
        (item) => item.id === startingCol
      );
      const endedColumn = newData.findIndex((item) => item.id === endingCol);
      const [removed] = newData[startedColumn].tasks.splice(startingIndex, 1);
      if (newData[endedColumn].tasks.length === 0) {
        newData[endedColumn].tasks.push(removed);
      } else {
        newData[endedColumn].tasks.splice(endingIndex, 0, removed);
      }
      setStore(newData);
    }
  };

  return (
    <>
      <NavBar />
      <Stack className="main-board-container" style={backgroundStyle(board)}>
        <SideBar />
        <ScrollContainer
          vertical={false}
          ignoreElements="p, button, input, Draggable"
          className="scroll-container"
        >
          {board && column && board.title ? (
            <Stack direction={"column"} height={"100%"}>
              <h1 className="board-nav-bar">
                {board && board.title ? board.title : null}
              </h1>
              <DragDropContext
                onDragEnd={handleDragEnd}
                style={{ flexGrow: 1 }}
              >
                <Droppable
                  droppableId="root"
                  type="column"
                  direction="horizontal"
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="board-container"
                    >
                      {column && column.length
                        ? column.map((item, index) => (
                            <Column
                              props={item}
                              key={item._id}
                              index={index}
                              data={{ column, setColumn }}
                            />
                          ))
                        : null}
                      {provided.placeholder}
                      <AddColumnBtn column={{ column, setColumn, boardId }} />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Stack>
          ) : (
            "loading"
          )}
        </ScrollContainer>
      </Stack>
    </>
  );
};

export default BoardDetail;
