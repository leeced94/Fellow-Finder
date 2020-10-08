import React from 'react';

const Message = ({
  previousCard,
  currentCard,
  found,
  names,
  previousCardID,
  currentCardID,
}) => {
  console.log(names);
  // const prevVal = previousCard.cardValue;
  // const curVal = currentCard.cardValue;

  // const firstPick = prevVal > -1 ? names[prevVal] : undefined;
  // const secondPick = curVal > -1 ? names[curVal] : undefined;
  const firstPick = previousCardID > -1 ? names[previousCardID] : undefined;
  const secondPick = currentCardID > -1 ? names[currentCardID] : undefined;

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
