import React from "react";
import FroalaEditor from "react-froala-wysiwyg";
import 'font-awesome/css/font-awesome.min.css';

// const ROOT_URL = process.env.REACT_APP_API_URL +"/api";
// const FROALA_KEY = process.env.REACT_APP_FROALA_KEY;
const CustomFroalaEditor = props => {
  return (
    <FroalaEditor
      tag={props.tag}
      config={{
        // imageUploadURL: `${ROOT_URL}/file/upload?editor=froala`,
        // requestHeaders: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        // },
        // imageUploadMethod: 'POST',
        placeholderText: 'Detail your question',
        requestWithCORS: true,
        toolbarSticky: false,
        height: 300,
        width: "100%",
        quickInsertTags: [''],
        // pluginsEnabled: { quickInsertTags: [] },
        // quickInsertButtons: [],
        toolbarButtons: [
          "fullscreen",
          "undo",
          "redo",
          "|",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "outdent",
          "indent",
          "clearFormatting",
          "insertTable",
          "clear",
          "insert",
          "html"
        ]
      }}
      model={props.model}
      onModelChange={props.onModelChange}
    />
  );
};

export default CustomFroalaEditor;
