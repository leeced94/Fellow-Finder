import React from 'react';

import Card from './Card';

const Board = ({ cardCreated, cards, onCardClick }) => (
  <div className="board">
    {cardCreated &&
      cards.map((card, idx) => (
        <Card
          cardIdx={idx}
          key={`Card${idx}`}
          cardValue={card.cardValue}
          cardStatus={card}
          onCardClick={onCardClick}
        />
      ))}
  </div>
);

export default Board;
