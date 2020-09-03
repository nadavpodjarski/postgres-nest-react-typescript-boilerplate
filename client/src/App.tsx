import React from 'react';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Navbar from './containers/Navbar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import SnackBar from './components/SnackBar';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/demo" component={Demo} />
          </Switch>
        </BrowserRouter>
      </div>
      <SnackBar
        position={{ vertical: 'bottom', horizontal: 'left' }}
        duration={3000}
      />
    </Provider>
  );
}

export default App;
