import React, { useState } from "react";

import { Controlled as Codemirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

let numOfMinimisedScreens = 0;
const minimisedStyles = { height: "55px", overflow: "initial" };

const CodeEditor = ({
  langName,
  value,
  lang,
  mode,
  codeMirrorOptions,
  setFn
}) => {
  const [minimisedEditor, setminimisedEditor] = useState(false);

  const resizeEditor = () => {
    if (numOfMinimisedScreens < 2) {
      if (minimisedEditor) {
        numOfMinimisedScreens--;
      } else {
        numOfMinimisedScreens++;
      }
      setminimisedEditor(!minimisedEditor);
    } else if (minimisedEditor) {
      numOfMinimisedScreens--;
      setminimisedEditor(!minimisedEditor);
    }
  };

  return (
    <div
      className="code-editor"
      style={minimisedEditor ? minimisedStyles : null}
    >
      <div className="editor-header" onClick={resizeEditor}>
        <span>
          {langName}
        </span>
        <button className="editor-resize-button">
          {minimisedEditor ? "+" : "-"}
        </button>
      </div>
      <Codemirror
        value={value}
        options={{
          mode: mode,
          ...codeMirrorOptions
        }}
        onBeforeChange={(editor, data, lang) => {
          setFn(lang);
        }}
      />
    </div>
  );
};

export default CodeEditor;
