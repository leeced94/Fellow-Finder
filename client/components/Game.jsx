import React from 'react';
import Board from './Board.jsx';
import InfoContainer from './InfoContainer.jsx';
import LeaderBoard from './LeaderBoard';
import Message from './Message';

const Game = ({ state, onCardClick }) => (
  <div className="Game">
    <InfoContainer user={state.user} clickCount={state.clickCount} />
    <Message
      previousCard={state.previousCard}
      currentCard={state.currentCard}
      found={state.found}
    />
    <Board
      cardCreated={state.cardCreated}
      cards={state.cards}
      onCardClick={onCardClick}
      hasWon={state.hasWon}
    />
    <LeaderBoard leaderBoard={state.leaderBoard} />
  </div>
);

export default Game;
