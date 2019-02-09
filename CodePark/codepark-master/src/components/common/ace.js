import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/c_cpp';
import 'brace/mode/csharp';
import 'brace/mode/css';
import 'brace/mode/golang';
import 'brace/mode/haskell';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/kotlin';
import 'brace/mode/mysql';
import 'brace/mode/php';
import 'brace/mode/python';
import 'brace/mode/ruby';
import 'brace/mode/sql';
import 'brace/mode/matlab';
import 'brace/mode/r';
import 'brace/theme/monokai';
// import 'brace/theme/github';

const CustomAceEditor = (props) => {
        return (
                <AceEditor
                mode={props.mode}
                theme={props.theme}
                name="answer"
                className="full-width editor"
                onLoad={props.onLoad}
                onChange={props.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={props.value}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                }}/>
        );
}

export default CustomAceEditor;