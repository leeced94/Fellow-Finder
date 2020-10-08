import React, { useState } from 'react';

// var currDiff = 'easy';

const Timer = (props) => {
  const [timer, setTimer] = useState(60);

// if(props.difficulty !== currDiff) {
//     currDiff = props.difficulty;
//     setTimer(60);
// }

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
