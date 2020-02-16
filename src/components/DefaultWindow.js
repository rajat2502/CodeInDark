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

  return (
    <div className="default-window" style={output ? { display: "none" } : null}>
      <h1 className="default-window-head">Code in the Dark</h1>
      {/* <h3>Instructions:</h3>
      <ol>
        <li>
          l"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        </li>
        <li>
          l"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        </li>
        <li>
          l"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        </li>
        <li>
          l"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        </li>
        <li>
          l"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        </li>
        <li>
          l"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        </li>
      </ol> */}

      {!code
        ? <FuntionButton
            children="Start Coding!"
            onClick={() => startTimer(300)}
            styles={{ fontSize: "1.4rem" }}
          />
        : null}
      {start
        ? <div className="timer">
            <span
              className={min < 5 ? "countdown" : null}
            >{`${min} : ${sec}`}</span>
          </div>
        : null}
    </div>
  );
};

export default DefaultWindow;
