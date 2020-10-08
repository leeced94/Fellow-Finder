import React from 'react';

import NavBar from './NavBar';
import Board from './Board';
import InfoContainer from './InfoContainer';
import LeaderBoard from './LeaderBoard';
import Message from './Message';

const Game = ({ state, onCardClick, handleDropdown, difficulty }) => (
  <div className='Game'>
    {/* <NavBar user={state.user} /> */}
    {/* <InfoContainer user={state.user} clickCount={state.clickCount} /> */}
    <Message
      previousCard={state.previousCard}
      currentCard={state.currentCard}
      found={state.found}
      names={state.cards.map(
        (card) => card.picture.split('/client/images/')[1].split('.')[0]
      )}
      previousCardID={state.previousCardID}
      currentCardID={state.currentCardID}
    />
    <Board
      cardCreated={state.cardCreated}
      cards={state.cards}
      onCardClick={onCardClick}
      handleDropdown={handleDropdown}
      difficulty={difficulty}
    />
    {/* <LeaderBoard leaderBoard={state.leaderBoard} /> */}
  </div>
);

export default Game;
