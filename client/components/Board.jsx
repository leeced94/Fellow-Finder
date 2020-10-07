import React from 'react';
import Card from './Card';
import Timer from './Timer';
// import Winner from './Winner';

const Board = ({ cardCreated, cards, onCardClick/*, hasWon */}) => {
//   if (hasWon) {
//     console.log('winner!');
//     return (
//     <div className="boardTimer">
//       <div className="board">
//         <Winner />
//         {cardCreated &&
//           cards.map((card, idx) => (
//             <Card
//               cardIdx={idx}
//               key={`Card${idx}`}
//               cardValue={card.cardValue}
//               cardStatus={card}
//               onCardClick={onCardClick}
//             />
//           ))}
//       </div>
//       <div className="timerDiv">
//         <Timer />
//       </div>
//   </div>
//   )
// }
  return (
    <div className="boardTimer">
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
      <div className="timerDiv">
        <Timer />
      </div>
    </div>
    );
}
export default Board;
