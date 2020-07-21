import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import Loading from './components/loading/Loading';
import Home from './components/home/Home';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path="/loading" component={Loading}/>
            <Route path="/home" component={Home}/>
            <Route path="/" component={Login}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
