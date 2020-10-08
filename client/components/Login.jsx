import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useInput } from '../hooks';

const Login = ({ logInUser }) => {
  const [username, handleChangeUserName] = useInput();
  const [password, handleChangePassword] = useInput();
  const [message, setMessage] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { id } = queryString.parse(location.search);

    if (id) {
      fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: id, password: id }),
        headers: {
          'Content-type': 'Application/json',
        },
      })
        .then((data) => data.json())
        .then((data) => {
          logInUser(data);
          history.push('/game');
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const login = async () => {
    try {
      const data = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-type': 'Application/json',
        },
      }).then((data) => data.json());

      if (data.message) {
        alert(data.message);
      } else {
        logInUser(data);
        setMessage('Success!');
        setTimeout(() => history.push('/game'), 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div className="signLogIn">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" value={username} onChange={handleChangeUserName} />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
        />

        <div className="buttons">
          <button type="submit">Log-in</button>
          <Link to="/signup">
            <button type="button" className="buttons">
              Sign Up
            </button>
          </Link>
        </div>

        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>
            <a href="/auth/login">Log in using Google</a>
          </li>
          <li>
            <a href="/auth/logout">Log out of Google</a>
          </li>
        </ul>

        <p>{message && message}</p>
      </form>
    </div>
  );
};

// old code
// export default withRouter(Login);
export default Login;
