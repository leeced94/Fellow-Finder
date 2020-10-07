import React from 'react';

const SideA = ({ onCardClick, cardIdx }) => (
  <div className="front" onClick={() => onCardClick(cardIdx)}>
    <img
      src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/21/original.png"
      width="100"
      height="100"
    />
  </div>
);

export default SideA;
