import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const SignUp = ({ signUpUser, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const signUp = () => {
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'Application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          signUpUser(data);
          alert('Signup successful');
          history.push('/game');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signLogIn">
      <h2>Create User</h2>
      <form>
        <label>Username: </label>
        <input type="text" value={username} onChange={usernameOnChange} />
        <label>Password: </label>
        <input type="password" value={password} onChange={passwordOnChange} />
      </form>
      <div className="buttons">
        <button onClick={signUp}>Sign Up</button>
        <Link to={`/`}>
          <button type="button" className="buttons">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
