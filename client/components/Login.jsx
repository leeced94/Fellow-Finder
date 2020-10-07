import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { useInput } from '../hooks';

const Login = ({ logInUser }) => {
  const [username, handleChangeUserName] = useInput();
  const [password, handleChangePassword] = useInput();
  const history = useHistory();

  // Old code, repeated state + handler and no useHistory
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const usernameOnChange = (e) => {
  //   setUsername(e.target.value);
  // };
  // const passwordOnChange = (e) => {
  //   setPassword(e.target.value);
  // };

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
        // alert('Login successful');
        history.push('/game');
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
      </form>
    </div>
  );
};

// old code
// export default withRouter(Login);
export default Login;
