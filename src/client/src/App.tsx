import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

function App() {
  const [welcomeMsg, setWelcomeMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/start');
      setWelcomeMsg(res.data.msg);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{welcomeMsg}</p>
      </header>
    </div>
  );
}

export default App;
