import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user: { username = 'Cedric', bestRecord, played } = {} }) => {
  return (
    <div className="NavBar">
      <header>Memory Game</header>
      <div className="right">
        <p id="userName">{username}</p>
        <Link to={'/user'}>
          <button>Go to user's page</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
