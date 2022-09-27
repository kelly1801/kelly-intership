import React, { useState, useEffect } from "react";

function Counter({ expDate }) {
  const [time, setTime] = useState("");
  const [interval, setIntervalRefresh] = useState();

  useEffect(() => {
    countDown()

    const refresh = setInterval(() => {
      countDown()
    }, 1000);

    setIntervalRefresh(refresh);

    return () => {
      clearInterval(refresh);
    }
  }, []);

  function countDown() {
    const millis = expDate - Date.now();

   const seconds = millis / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    setTime(
      `${Math.floor(hours)}h ${Math.floor(minutes % 60)}m ${Math.floor(
        seconds % 60
      )}s`
    );
  }

  return <div className="de_countdown">{time}</div>;
};

export default Counter;
