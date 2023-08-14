import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./TaskEditor.css";
import { Stack } from "@mui/material";
import BoardService from "../../../../services/board.service";
import useBoard from "../../../../store/useBoard";
import useColumn from "../../../../store/useColumn";

export default function TaskEditor({ setDisplayEditor, taskId, boardId }) {
  const [task, setTask] = React.useState();
  const { setBoard } = useBoard();
  const { setColumn } = useColumn();

  React.useEffect(() => {
    const data = {
      boardId: boardId,
      taskId: taskId,
    };
    BoardService.getTaskInfo(data)
      .then((res) => {
        if (res.data.task.description) {
          setTask(res.data.task.description);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      const data = {
        boardId: boardId,
        taskId: taskId,
        description: editorRef.current.getContent(),
      };
      BoardService.updateTaskDescription(data)
        .then((res) => {
          console.log(res.data.board);
          setBoard(res.data.board);
          setColumn(res.data.board.columns);
          setDisplayEditor(false)
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCloseEditor = () => {
    closeEditor(false);
  };

  return (
    <>
      <Editor
        apiKey="pjw9plm980lpl2yd26dse0z8hjqjsg8qrg2cnote5gsmslhx"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={task ? task : "Add a more detailed description..."}
        init={{
          selector: "textarea",
          skin: "oxide-dark",
          content_css: "dark",
          height: 300,
          placeholder: "Add a more detailed description...",
          menubar: false,
          plugins: [
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
        }}
      />
      <Stack direction={"row"} gap={2} mt={2}>
        <button className="task-editor-save-btn" onClick={log}>
          Save
        </button>
        <button
          className="task-editor-save-btn task-editor-cancel-btn"
          onClick={() => setDisplayEditor(false)}
        >
          Cancel
        </button>
      </Stack>
    </>
  );
}
