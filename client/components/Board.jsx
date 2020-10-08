import React from 'react';
import Card from './Card';
import Timer from './Timer';
// import Winner from './Winner';

const Board = ({
  cardCreated,
  cards,
  onCardClick,
  handleDropdown,
  difficulty,
}) => {
  return (
    <div className='boardTimer'>
      <div className='board'>
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
      <div className='timerAndDiff'>
        <div id='diffDropdown'>
          <p> Game Mode: {difficulty} </p>
          <p> {cards.length / 2} pairs </p>
          <select
            value={difficulty}
            onChange={handleDropdown}
            className='selectDifficulty'
          >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <div className='timerDiv'>
          <Timer difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
};
export default Board;
