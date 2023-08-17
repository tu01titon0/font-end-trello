import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./TaskEditor.css";
import { Stack } from "@mui/material";

export default function TaskEditor({ setDisplayEditor }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
        initialValue="Add a more detailed description..."
        init={{
          selector: "textarea",
          skin: "oxide-dark",
          content_css: "dark",
          height: 300,
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
