import React, { useImperativeHandle, useEffect } from "react";
import { useTimer } from "react-timer-hook";

function Timer({ timerCountDown, timerRef, onTimeExpire }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerCountDown);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: time,
    onExpire: () => {
      console.warn("onExpire called");
      onTimeExpire();
    },
  });

  useEffect(() => {
    if (isRunning) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + timerCountDown);
      restart(time);
    }
  }, [timerCountDown]);

  useImperativeHandle(timerRef, () => ({
    startTimer() {
      start();
    },
    pauseTimer() {
      pause();
    },
    resumeTimer() {
      resume();
    },
    restartTimer() {
      const time = new Date();
      time.setSeconds(time.getSeconds() + timerCountDown);
      restart(time);
    },
  }));

  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, "0");
  }

  if (!isRunning) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "100px" }}>
          <span>-</span>:<span>-</span>
        </div>
        <p>{isRunning ? "Playing" : "Not playing"}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{addLeadingZeros(minutes, 2)}</span>:
        <span>{addLeadingZeros(seconds, 2)}</span>
      </div>
      <p>{isRunning ? "Playing" : "Not playing"}</p>
    </div>
  );
}

export default Timer;
