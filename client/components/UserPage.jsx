import React, { useState } from 'react';

import { useInput } from '../hooks';

const UserPage = ({ user: { username }, changeUserName }) => {
  const [newUserName, handleChange, resetInput] = useInput('');
  const [message, setMessage] = useState('');

  const updateUser = async () => {
    const user = await fetch(`/api/user/${username}`, {
      method: 'PUT',
      body: JSON.stringify({ newUserName }),
      headers: {
        'Content-type': 'Application/json',
      },
    }).then((data) => data.json());
    console.log(user);
    changeUserName(user.username);
    resetInput();
  };

  const deleteUser = () => {
    fetch(`/api/user/${username}`, {
      method: 'DELETE',
    }).then(() => {
      // alert('User deleted');
      setMessage('User is deleted!');
    });
  };

  return (
    <div className="UserName">
      <p>{username}</p>
      <input
        type="text"
        value={newUserName}
        onChange={handleChange}
        placeholder="Enter new user name"
      />
      <button onClick={updateUser}>Update User Name</button>
      <button onClick={deleteUser}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserPage;
