import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = props => {
  const [username, setUsername]  = useState('');
  const [password, setPassword]  = useState('');

  const [newUsername, setNewUsername]  = useState('');
  const [newPassword, setNewPassword]  = useState('');

  const [showbutton, setShowbutton]  = useState(false);

  const [myUsers, setMyUsers]  = useState([]);

  return (
    <div className="App">
      <h1>login</h1>
      <form
      onSubmit={e => {
        e.preventDefault();
        const user = {
          username: username,
          password: password
        }

        axios.post('http://localhost:5000/api/login',user)
          .then(res => {
            setShowbutton(true);
          })
          .catch(err => console.log(err))

      }}
      >
        <label>username</label>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

        <label>password</label>
        <input type='text' value={password} onChange={e => setPassword(e.target.value)} />

        <button>submit</button>
      </form>




      <h1>create account</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          const user = {
            username: username,
            password: password
          }

          axios.post('http://localhost:5000/api/register',user)
            .then(res => console.log(res))
            .catch(err => console.log(err))

      }}
      >
        <label>username</label>
        <input type='text' value={newUsername} onChange={e => setNewUsername(e.target.value)} />

        <label>password</label>
        <input type='text' value={newPassword} onChange={e => setNewPassword(e.target.value)} />

        <button>submit</button>
      </form>
    
      {showbutton ? <button
      style={{width: "150px", height:'40px', background:"blue", color:"white", margin: "25px"}}
      onClick={e => {
        e.preventDefault();

        axios.get('http://localhost:5000/api/users', {headers: {username: username, password: password}})
          .then(res => setMyUsers(res.data))
          .catch(err => console.log(err))
      }}
      >show users</button> : null}

      {myUsers.length ? myUsers.map(user => <div key={user.id}>{user.username}</div>) : null}
    </div>
  );
}

export default App;
