import React, { useState } from 'react';

const SideA = ({ onCardClick, cardIdx }) => {
const [shake, setShake] = useState(0);
return (
  <div className="front" onClick={() => onCardClick(cardIdx)}>
    <img
      src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/21/original.png"
      width="100"
      height="100"
      onClick={() => setShake(1)} 
      onAnimationEnd={() => setShake(0)}
    />
  </div>
);
}
export default SideA;
