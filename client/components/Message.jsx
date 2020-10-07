import React from 'react';

import { names } from '../pictures';

const Message = ({ previousCard, currentCard, found }) => {
  const prevVal = previousCard.cardValue;
  const curVal = currentCard.cardValue;

  const firstPick = prevVal > -1 ? names[prevVal] : undefined;
  const secondPick = curVal > -1 ? names[curVal] : undefined;

  const foundElem = found ? `Found ${names[found]}!` : `Who's next?`;

  return (
    <div className="message-container">
      {foundElem}
      <div className="message-picks">
        <div>{firstPick}</div>
        <div>{secondPick}</div>
      </div>
    </div>
  );
};

export default Message;
