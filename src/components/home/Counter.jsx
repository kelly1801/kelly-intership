import React, { useState, useEffect } from "react";

function Counter({ expDate }) {
  let initialTime;
  const countDown = expDate;
  const [time, setTime] = useState({
    millis: 1,
    seconds: 1,
    minutes: 1,
    hours: 1,
  });

  function counterTime() {
    initialTime = Date.now();

    setTime(
      {millis : Math.floor(countDown - initialTime),
      seconds : time.millis / 1000,
      minutes : Math.floor(time.seconds / 60),
      hours : Math.floor(time.minutes / 24)}
    );
  
  }

  useEffect(()=>{
counterTime()
  }, [time.seconds])

  

  return (
    <div className="de_countdown">{`${time.hours}h ${
      time.minutes % 60
    }m ${Math.floor(time.seconds % 60)}s`}</div>
  );
}

export default Counter;
