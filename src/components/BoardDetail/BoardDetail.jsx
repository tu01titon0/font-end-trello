import React, { useEffect, useState, useRef } from "react";
import Column from "./Column/Column";
import data2 from "./MockData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./BoardDetail.css";
import AddColumnBtn from "./AddColumnInput/AddColumnInput";
import NavBar from "../HomePage/Navbar/NavBar";
import { CircularProgress, Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import ScrollContainer from "react-indiana-drag-scroll";
import { useParams } from "react-router";
import BoardService from "../../services/board.service";
import useBoard from "../../store/useBoard";

const BoardDetail = () => {
  const [store, setStore] = useState(data2);
  const { board, setBoard } = useBoard();
  const [column, setColumn] = useState();
  const boardId = useParams().id;
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardId]);

  const backgroundStyle = (board) => ({
    backgroundImage: board
      ? `url("../../../${board.backgroundImage}")`
      : "none",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });

  const handleDragEnd = (res) => {
    const startingIndex = res.source.index;
    const startingCol = res.source.droppableId;
    const typeOfItem = res.type;
    const endingIndex = res.destination.index;
    const endingCol = res.destination.droppableId;
    setLoading(false);

    if (typeOfItem === "column") {
      const boardColData = [...board.columns];
      const [removedCol] = boardColData.splice(startingIndex, 1);
      boardColData.splice(endingIndex, 0, removedCol);
      setColumn(boardColData);
      const dataToBe = [...boardColData.map((item) => item._id)];
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
      setLoading(true);
    } else if (typeOfItem === "task") {
      const boardColData = [...board.columns];
      const startedColIndex = boardColData.findIndex(
        (item) => item._id === startingCol
      );
      const endedColIndex = boardColData.findIndex(
        (item) => item._id === endingCol
      );
      // console.log("data array", boardColData);
      // console.log("starting index in col", startingIndex);
      // console.log("starting col index", startedColIndex);
      // console.log("ended index of col", endedColIndex);
      // console.log("ended index in col", endingIndex);
      const [removedTask] = boardColData[startedColIndex].tasks.splice(
        startingIndex,
        1
      );

      if (boardColData[endedColIndex].tasks.length === 0) {
        boardColData[endedColIndex].tasks.push(removedTask);
      } else {
        boardColData[endedColIndex].tasks.splice(endingIndex, 0, removedTask);
      }

      const dataToBE = {
        removedItemId: removedTask._id,
        startingColId: boardColData[startedColIndex]._id,
        endingColId: boardColData[endedColIndex]._id,
        startedIndex: startingIndex,
        endedIndex: endingIndex,
        boardId: boardId,
      };

      // setStore(newData);
      setColumn(boardColData);
      BoardService.updateDragDropTask(dataToBE)
        .then((res) => {
          setBoard(res.data.board);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <NavBar />
      <Stack className="main-board-container" style={backgroundStyle(board)}>
        <SideBar />
        <ScrollContainer
          vertical={false}
          ignoreElements="p, button, input, section, Draggable"
          className="scroll-container"
        >
          <Stack direction={"column"} height={"100%"}>
            <h1 className="board-nav-bar" style={{color: 'white'}}>
              {board && board.title ? board.title : null}
            </h1>
            <DragDropContext onDragEnd={handleDragEnd} style={{ flexGrow: 1 }}>
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
                            board={{ boardId }}
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
        </ScrollContainer>
      </Stack>
    </>
  );
};

export default BoardDetail;
