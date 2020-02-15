import React, { useRef, useEffect } from "react";

import { runCode } from "./downloadFile";

const DisplayWindow = ({ html, css, js, output }) => {
  const iframeRef = useRef(null);

  useEffect(
    () => {
      runCode(iframeRef, html, css, js);
    },
    [html, css, js]
  );

  return (
    <div
      className="display-window"
      style={!output ? { display: "none" } : null}
    >
      <section className="result">
        <iframe title="result" className="iframe" ref={iframeRef} />
      </section>
      />
    </div>
  );
};

export default DisplayWindow;
