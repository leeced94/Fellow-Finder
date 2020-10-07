import React, { useState } from 'react';

const Timer = () => {
  const [timer, setTimer] = useState(60);

setTimeout(() => {
    if (timer > 0) {
        setTimer(timer - 1)}
    }, 1000);

  return (
    <div>
      Time Remaining:
      <p id='timer'>{timer}</p>
    </div>
  )
};

export default Timer;
