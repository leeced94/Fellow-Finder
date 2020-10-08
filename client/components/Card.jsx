import React from 'react';
import SideA from './SideA';
import SideB from './SideB';

const Card = ({ cardIdx, cardStatus, onCardClick }) => (
  <div className="card">
      {!cardStatus.flipped ? (
        <SideA onCardClick={onCardClick} cardIdx={cardIdx} />
        ) : (
        <SideB cardStatus={cardStatus} />
        )}
  </div>
);

export default Card;
