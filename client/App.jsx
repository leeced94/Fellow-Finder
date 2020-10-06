import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';

import './style.css';
import pictures from './Picture';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardCreated: false,
      user: {}, // {username, bestRecord, played}
      cardsArray: [],
      clickCount: 0,
      matched: 0, // increment when ever the 2 cards values match, game ends when matched = 16
      previousCard: {}, // add in the cardObj from cards
      previousCardID: -1,
      currentCard: {},
      currentCardID: -1,
      // allowFlipping: true,
      cardNeedUpdate: false,
      leaderBoard: {}, // { bestRecord: [{username: bestRecord}, ...], {mostPlays: [{username: played}, ... ] }  }
      found: null,
      canClick: true
    };

    this.logInUser = this.logInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    const cardsArray = this.createCardsArray();
    const cardCreated = true;
    this.setState({ ...this.state, cardsArray, cardCreated });
  }
  
  componentDidUpdate() {
    if (this.state.cardNeedUpdate) {
      const {
        currentCard,
        previousCard,
        matched,
        currentCardID,
        previousCardID,
      } = this.state;

      if (currentCard.cardValue === previousCard.cardValue) {
        console.log('found a match!');
        
        // final match
        if (matched === 14) { // Does this need to be 16 instead of 14 matches?
          setTimeout(() => {
            alert('game completed');
          }, 0);

          fetch('/api/update', {
            method: 'PUT',
            body: JSON.stringify({
              user: this.state.user,
              clickCount: this.state.clickCount,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          })
            .then((data) => data.json())
            .then((data) => {
              const cardsArray = this.createCardsArray();
              const { user, leaderBoard } = data;

              // reset state?
              this.setState({
                user,
                leaderBoard,
                cardsArray,
                clickCount: 0,
                matched: 0,
                previousCard: {},
                previousCardID: -1,
                currentCard: {},
                currentCardID: -1,
                cardNeedUpdate: false,
                found: null,
                canClick: true
              });
            });
        } else {
          // a match but not the final match
          // store the cardValue in found so we can disply the match in message
          const found = currentCard.cardValue;

          this.setState({
            matched: this.state.matched + 2,
            cardNeedUpdate: false,
            previousCard: {},
            previousCardID: -1,
            currentCard: {},
            currentCardID: -1,
            found,
            canClick: true
          });
        }
      } else {
        console.log('not a match');
        
        // reset flipped
        previousCard.flipped = false;
        currentCard.flipped = false;

        const cardsArray = [...this.state.cardsArray];

        cardsArray[previousCardID] = previousCard;
        cardsArray[currentCardID] = currentCard;

        setTimeout(() => {
          this.setState({
            cardsArray,
            previousCard: {},
            previousCardID: -1,
            currentCard: {},
            currentCardID: -1,
            cardNeedUpdate: false,
            canClick: true
          });
        }, 1500); // Does clicking another card during this timeout cause the matching bug??
      }
    }
  }

  // first Card is clicked --> canClick true --> setState -> componentDidUpdate() --> cardNeedUpdate is false XXX
  // second card is clicked --> setState() --> cardNeedUpdate = true and canClick = false --> 
    // componentDidUpdate() --> gross/if else
 


  createCardsArray() {
    const cardsArray = [];

    for (let i = 0; i < 8; i += 1) {
      const card = {
        flipped: false,
        cardValue: i,
        picture: pictures[i].content,
      };

      cardsArray.push(card, card);
      cardsArray.sort(() => Math.random() - 0.5);
    }

    return cardsArray;
  }

  onCardClick(id, cardStatus) {
    console.log('clicked')

    if (this.state.canClick) {
    // console.log('received from id', id, cardStatus);
      const flipped = true;
      const clickCount = this.state.clickCount + 1;
      // on odd clicks (ie first click of the turn)
      // first card
      if (clickCount % 2 === 1) {
        const previousCardID = id;
        const previousCard = { ...cardStatus, flipped };
        const cardsArray = [...this.state.cardsArray];
        cardsArray[id] = previousCard;

        this.setState({
          cardsArray,
          clickCount,
          previousCard,
          previousCardID,
          found: null,
        });
      } else { // second card
        // on even clicks (ie second click of the turn)
        const currentCardID = id;
        const currentCard = { ...cardStatus, flipped };
        const cardsArray = [...this.state.cardsArray];
        cardsArray[id] = currentCard;
        // at this point, the 2nd card is not flipped yet, so we need to update the state to complete the flipping
        // after components have been updated, we will check for if previous card value matches the current card value
        this.setState({
          cardsArray,
          clickCount,
          currentCard,
          currentCardID,
          cardNeedUpdate: true,
          canClick: false
        });
      }
    } 
  }

  logInUser(data) {
    // send post request to server to log in
    const { user, leaderBoard } = data;
    console.log('logged in user is', user);
    const newState = { user, leaderBoard };
    this.setState(newState);
  }

  signUpUser(data) {
    // send post request to server to sign up
    const { user, leaderBoard } = data;
    const newState = { user, leaderBoard };
    this.setState(newState);
  }

  render() {
    return (
      <div className="router">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              // <Login {...props} state={this.state} logInUser={this.logInUser} />
              <Game
                {...props}
                state={this.state}
                onCardClick={this.onCardClick}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                state={this.state}
                signUpUser={this.signUpUser}
              />
            )}
          />
          <Route
            exact
            path="/game"
            render={(props) => (
              <Game
                {...props}
                state={this.state}
                onCardClick={this.onCardClick}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
