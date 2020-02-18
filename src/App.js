import React, { useState, useEffect } from "react";

import "./App.css";

import DefaultWindow from "./components/DefaultWindow";
import DisplayWindow from "./components/DisplayWindow";
import CodeEditor from "./components/CodeEditor";
import Navbar from "./components/Navbar";

let seeOutputtime = 3;

const App = () => {
  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
    tabSize: 2,
    extraKeys: {
      "Ctrl-S": () => saveToLocalStorage()
    }
  };

  // states
  const [html, sethtml] = useState("");
  const [css, setcss] = useState("");
  const [js, setjs] = useState("");
  const [output, setOutput] = useState(false);
  const [code, setcode] = useState(false);

  // logic to save file
  const saveToLocalStorage = () => {
    if (html !== "" || css !== "" || js !== "") {
      const langObj = { html, css, js };
      localStorage.setItem("langObj", JSON.stringify(langObj));
      window.alert("Pen Saved ;-)");
    }
  };

  // logic to view output
  const seeOutput = () => {
    if (seeOutputtime > 0) {
      if (
        window.confirm(
          `You have ${seeOutputtime} chance(s) left. Are you sure you want to utilise your chance?`
        )
      ) {
        seeOutputtime--;
        setOutput(true);
        setTimeout(() => {
          setOutput(false);
        }, 5000);
      }
    } else {
      window.alert("Sorry, You don't have any chances left!");
    }
  };

  // logic to start game
  const startGame = () => {
    setcode(true);
  };

  // logic to stop the game
  const stopGame = () => {
    setcode(false);
    setOutput(true);
  };

  useEffect(() => {
    // const langObj = JSON.parse(localStorage.getItem("langObj"));
    // if (langObj !== null) {
    //   sethtml(langObj.html);
    //   setcss(langObj.css);
    //   setjs(langObj.js);
    // }
    // logic to disable from inspect/copy/paste
    document.onkeydown = function(e) {
      // to disble inspect
      if (e.keyCode === 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
        return false;
      }
      // to disable copy/paste
      if (e.ctrlKey && e.keyCode === "C".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode === "V".charCodeAt(0)) {
        return false;
      }
    };
  }, []);

  return (
    <div className="App">
      <Navbar
        save={saveToLocalStorage}
        html={html}
        output={output}
        seeOutput={seeOutput}
        code={code}
      />
      <div className="main">
        <DefaultWindow
          code={code}
          startGame={startGame}
          stopGame={stopGame}
          output={output}
        />
        <DisplayWindow
          html={html}
          css={css}
          js={js}
          saveToLocalStorage={saveToLocalStorage}
          output={output}
        />

        <section
          className={code ? "playground" : "playground mobile-playground"}
          style={!code ? { width: "0" } : null}
        >
          <CodeEditor
            langName="HTML"
            value={html}
            mode="htmlmixed"
            codeMirrorOptions={codeMirrorOptions}
            lang={html}
            setFn={sethtml}
          />
          <CodeEditor
            langName="CSS"
            value={css}
            mode="css"
            codeMirrorOptions={codeMirrorOptions}
            lang={css}
            setFn={setcss}
          />
          <CodeEditor
            langName="JavaScript"
            value={js}
            mode="javascript"
            codeMirrorOptions={codeMirrorOptions}
            lang={js}
            setFn={setjs}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
