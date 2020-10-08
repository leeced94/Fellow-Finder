import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './components/Game';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserPage from './components/UserPage';

import './style.css';
// import pictures from './Picture';
import pictures from './pictures';

const initialState = {
  cardCreated: false,
  user: {}, // {username, bestRecord, played}
  cards: [],
  clickCount: 0,
  matched: 0, // increment when ever the 2 cards values match, game ends when matched = 16
  previousCard: {}, // add in the cardObj from cards
  previousCardID: -1,
  currentCard: {},
  currentCardID: -1,
  cardNeedUpdate: false,
  leaderBoard: {}, // { bestRecord: [{ username: bestRecord }, ...], { mostPlays: [{ username: played }, ... ]}}
  found: null,
  canClick: true,
  hasWon: false,
  difficulty: 'easy',
};

const difficultyObj = {
  easy: 8,
  medium: 10,
  hard: 12,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.logInUser = this.logInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.processFinalMatch = this.processFinalMatch.bind(this);
    this.processNormalMatch = this.processNormalMatch.bind(this);
    this.processNotMatch = this.processNotMatch.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);

    this.flipRef = React.createRef();
    this.correctRef = React.createRef();
    this.incorrectRef = React.createRef();
    this.winRef = React.createRef();
  }

  createRandomCards(randomPictures) {
    /**
     *  let user pick the size
     * we need an select dropdown
     * easy = 4 x 4 = 16 / 2 = 8 pairs
     * medium = 4 x 5 = 20 / 2 = 10 pairs
     * large = 4 x 6 = 24 / 2 = 12 pairs
     *
     * sort the pictures randomly, take the first 8/10/12 pictures
     *
     */

    const cards = randomPictures.map((picture, idx) => ({
      flipped: false,
      cardValue: idx,
      picture,
    }));

    cards.push(...cards);
    cards.sort(() => Math.random() - 0.5);

    return cards;
  }

  // helper function
  getPicsPairs(difficulty) {
    // difficulty === easy/medium/hard
    const numOfPairs = difficultyObj[difficulty]; // 8/10/12
    const picsPairs = pictures
      .sort(() => Math.random() - 0.5) // random the order
      .slice(0, numOfPairs); // slice first numOfPairs

    return picsPairs;
  }

  componentDidMount() {
    const picsPairs = this.getPicsPairs(this.state.difficulty);
    const cards = this.createRandomCards(picsPairs);
    console.log(cards);
    const cardCreated = true;
    this.setState({ cards, cardCreated });
  }

  handleDropdown(event) {
    const difficulty = event.target.value; // easy/medium/hard
    const picsPairs = this.getPicsPairs(difficulty);
    const cards = this.createRandomCards(picsPairs);

    this.createRandomCards(picsPairs);
    this.setState({
      difficulty,
      cards,
    });
  }

  async getUserAndLeaderBoard() {
    const { user, leaderBoard } = await fetch('/api/update', {
      method: 'PUT',
      body: JSON.stringify({
        user: this.state.user,
        clickCount: this.state.clickCount,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((data) => data.json());

    return { user, leaderBoard };
  }

  async processFinalMatch() {
    const { clickCount } = this.state;

    const cards = this.createRandomCards();
    const { user, leaderBoard } = await this.getUserAndLeaderBoard();

    this.setState({
      ...initialState,
      user,
      leaderBoard,
      cards,
      clickCount,
    });
  }

  processNormalMatch() {
    this.correctRef.current.currentTime = 0;
    this.correctRef.current.play();
    this.flipRef.current.pause();

    const { currentCard, matched, currentCardID } = this.state;

    // const found = currentCard.cardValue;
    const found = currentCardID;

    this.setState({
      matched: matched + 2,
      cardNeedUpdate: false,
      previousCard: {},
      previousCardID: -1,
      currentCard: {},
      currentCardID: -1,
      found,
      canClick: true,
    });
  }

  processNotMatch() {
    this.incorrectRef.current.currentTime = 0;
    this.incorrectRef.current.play();
    this.flipRef.current.pause();

    const { currentCardID, previousCardID, cards } = this.state;

    const newCards = cards.map((card, idx) =>
      idx === previousCardID || idx === currentCardID
        ? { ...card, flipped: false }
        : card
    );

    setTimeout(() => {
      this.setState({
        cards: newCards,
        previousCard: {},
        previousCardID: -1,
        currentCard: {},
        currentCardID: -1,
        cardNeedUpdate: false,
        canClick: true,
      });
    }, 1500);
  }

  async componentDidUpdate() {
    const { cardNeedUpdate, currentCard, previousCard, matched } = this.state;
    const isMatched = currentCard.cardValue === previousCard.cardValue;

    if (!cardNeedUpdate) return;

    if (!isMatched) return this.processNotMatch();

    // final match
    if (matched === this.state.difficulty * 2 - 2) {
      this.winRef.current.currentTime = 0;
      this.winRef.current.play();

      this.setState({ hasWon: true });
      await this.processFinalMatch();
    } else {
      // a match but not the final match
      // store the cardValue in found so we can display the match in message
      this.processNormalMatch();
    }
  }

  // first Card is clicked --> canClick true --> setState -> componentDidUpdate() --> cardNeedUpdate is false XXX
  // second card is clicked --> setState() --> cardNeedUpdate = true and canClick = false -->
  // componentDidUpdate() --> gross/if else

  onCardClick(cardIdx) {
    const { canClick, clickCount, cards } = this.state;

    if (!canClick) return;

    this.flipRef.current.currentTime = 0;
    this.flipRef.current.play();

    const newClickCount = clickCount + 1;
    const flippedCard = { ...cards[cardIdx], flipped: true };
    const newCards = cards.map((card, idx) =>
      idx === cardIdx ? flippedCard : card
    );

    const newState =
      newClickCount % 2 === 1
        ? // Odd click === first card
          {
            cards: newCards,
            clickCount: newClickCount,
            previousCard: flippedCard,
            previousCardID: cardIdx,
            found: null,
          }
        : // Even click === second card
          // at this point, the 2nd card is not flipped yet, so we need to update the state to complete the flipping
          // after components have been updated, we will check for if previous card value matches the current card value
          {
            cards: newCards,
            clickCount: newClickCount,
            currentCard: flippedCard,
            currentCardID: cardIdx,
            cardNeedUpdate: true,
            canClick: false,
          };

    this.setState(newState);
  }

  logInUser(data) {
    // send post request to server to log in
    const { user, leaderBoard } = data;
    console.log('logged in user is', user);
    this.setState({ user, leaderBoard });
  }

  signUpUser(data) {
    // send post request to server to sign up
    const { user, leaderBoard } = data;
    console.log('signed up user is', user);
    this.setState({ user, leaderBoard });
  }

  changeUserName(newUserName) {
    this.setState({
      user: {
        ...this.state.user,
        username: newUserName,
      },
    });
  }

  render() {
    return (
      <div>
        <audio
          ref={this.incorrectRef}
          className='incorrect'
          src='/client/sounds/incorrect.wav'
          type='audio/wav'
        ></audio>
        <audio
          ref={this.correctRef}
          className='correct'
          src='/client/sounds/correct.wav'
          type='audio/wav'
        ></audio>
        <audio
          ref={this.flipRef}
          className='flip'
          src='/client/sounds/CardFlip.ogg'
          type='audio/ogg'
        ></audio>
        <audio
          ref={this.winRef}
          className='flip'
          src='/client/sounds/ohyeah.wav'
          type='audio/wav'
        ></audio>
        <div className='router'>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Login {...props} logInUser={this.logInUser} />
              )}
            />
            <Route
              exact
              path='/SignUp'
              render={(props) => (
                <SignUp {...props} signUpUser={this.signUpUser} />
              )}
            />
            <Route
              exact
              path='/game'
              render={(props) => (
                <Game
                  {...props}
                  state={this.state}
                  onCardClick={this.onCardClick}
                  handleDropdown={this.handleDropdown}
                  difficulty={this.state.difficulty}
                />
              )}
            />

            <Route
              exact
              path='/user'
              render={(props) => (
                <UserPage
                  {...props}
                  user={this.state.user}
                  changeUserName={this.changeUserName}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
