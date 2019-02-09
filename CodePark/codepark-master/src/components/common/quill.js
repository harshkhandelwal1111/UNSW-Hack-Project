import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomQuill = props => {
    let modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean']
        ],
      }
     
      let formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
      ]

      return (
        <div className="text-editor">
        {/* {console.log(props.value)} */}
          <ReactQuill theme="snow"
            className="editor"
            value={props.value}
            onChange={props.onModelChange}
            modules={modules}
            formats={formats}>
          </ReactQuill>
        </div>
      );
}

export default CustomQuill;