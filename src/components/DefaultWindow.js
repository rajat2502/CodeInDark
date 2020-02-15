import React, { useState } from "react";
import FuntionButton from "./FuntionButton";

let counter;

const DefaultWindow = ({ code, startGame }) => {
  const [min, setmin] = useState("60");
  const [sec, setsec] = useState("00");
  const [start, setstart] = useState(false);

  const startTimer = (duration = 3600) => {
    var timer = duration,
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

  const stopTimer = () => {
    console.log(min, sec);
    setstart(false);
    clearInterval(counter);
  };

  return (
    <div className="default-window">
      <h1>Code in the Dark</h1>
      <br />
      {!code
        ? <FuntionButton
            children="Start Coding!"
            onClick={() => startTimer(10)}
          />
        : null}
      {start
        ? <div className="timer">
            {`${min} : ${sec}`}
          </div>
        : null}
    </div>
  );
};

export default DefaultWindow;
