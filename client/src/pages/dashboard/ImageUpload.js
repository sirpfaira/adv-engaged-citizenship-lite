import logo from '../../logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState('');
  const [post, setPost] = useState('');
  const [resToPost, setResToPost] = useState('');

  useEffect(() => {
    callApi()
      .then((data) => {
        console.log(`Data: ${data}`);
        setResponse(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const callApi = async () => {
    const res = await axios.get('/');
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(state.post),
      body: JSON.stringify({ post: post }),
    });
    const body = await res.text();
    setResToPost(body);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Concurrent App by Sir Pfaira
        </a>
      </header>
      <p>{`GET REQUEST: ${response}`}</p>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type='text'
          value={post || ''}
          onChange={(e) => setPost(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <p>{resToPost}</p>
    </div>
  );
}

export default App;