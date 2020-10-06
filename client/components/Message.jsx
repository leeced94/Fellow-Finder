import React from 'react';

const Message = (props) => {
  const names = [
    'Will',
    'Phil',
    'Kyle',
    'Sara',
    'Keiran',
    'Jeho',
    'Wayne',
    'Midori',
  ];
  const prevVal = props.state.previousCard.cardValue;
  const curVal = props.state.currentCard.cardValue;
  const found = props.state.found;
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
