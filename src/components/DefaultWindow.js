import React, { useState } from "react";
import FuntionButton from "./FuntionButton";

let counter;

const DefaultWindow = ({ code, startGame, stopGame, output }) => {
  const [min, setmin] = useState();
  const [sec, setsec] = useState();
  const [start, setstart] = useState(false);

  const startTimer = (duration = 3600) => {
    let timer = duration,
      minutes,
      seconds;
    counter = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setmin(minutes);
      setsec(seconds);
      setstart(true);

      if (--timer < 0) {
        stopTimer();
      }
    }, 1000);
    startGame();
  };

  // logic to stop timer
  const stopTimer = () => {
    setstart(false);
    clearInterval(counter);
    stopGame();
  };

  const submitGame = () => {
    if (window.confirm("Are you sure you want to submit now?")) {
      stopGame();
    }
  };

  return (
    <div className="default-window" style={output ? { display: "none" } : null}>
      <div className="instructions">
        <h1 className="default-window-head">Instructions</h1>
        <ol>
          <li>Code In Dark is a 1 hour event.</li>
          <li>You are not allowed to see the output.</li>
          <li>Use of any unfair means will lead to disqualification.</li>
          <li>You will be given three chances to see the output.</li>
          <li>
            Each time you will be allowed to see the output for 5 seconds.
          </li>
          <li>The Code Editors will automatically get closed after 1 hour.</li>
        </ol>
      </div>
      <div>
        <h1 className="default-window-head">Code in the Dark</h1>
        {start
          ? <div className="timer">
              <span
                className={min < 5 ? "countdown" : null}
              >{`${min} : ${sec}`}</span>
            </div>
          : null}
        {!code
          ? <FuntionButton
              children="Start Coding!"
              onClick={() => startTimer(3600)}
              styles={{ fontSize: "1.4rem" }}
            />
          : <FuntionButton
              children="Submit Now"
              onClick={submitGame}
              styles={{ fontSize: "1.4rem" }}
            />}
      </div>
    </div>
  );
};

export default DefaultWindow;
