import React from 'react';
import Home from './containers/Home';
import Test from './containers/Demo';
import Navbar from './components/Navbar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/demo" component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
