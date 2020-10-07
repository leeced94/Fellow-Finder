import React from 'react';
import SideA from './SideA';
import SideB from './SideB';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const Card = (props) => {
  return (
    <div className="card">
      {/* <Flippy flipOnClick={!props.cardStatus.isFlipped}> */}
      {/* <Flippy isFlipped={props.cardStatus.isFlipped}> */}
      <Flippy
        id={props.id}
        flipOnClick={true}
        // isFlipped={props.cardStatus.flipped}  // can't flip 2nd card, but does invoke onCardClick -> will turn back first card
        isFlipped={props.cardStatus.flipped ? true : undefined} // flips 2nd card but doesn't not auto flip back on mismatch
      >
        <FrontSide
          id="front"
          // onClick={(e) => {
          //   console.log('isFlipped?', props.cardStatus.flipped);
          //   props.onCardClick(props.id, props.cardStatus);
          // }}
        >
          <SideA
            onCardClick={props.onCardClick}
            cardStatus={props.cardStatus}
            id={props.id}
          />
        </FrontSide>
        <BackSide id="back">
          <SideB
            className="back"
            cardValue={props.cardValue}
            cardStatus={props.cardStatus}
          />
        </BackSide>
      </Flippy>
    </div>
  );
};

export default Card;
