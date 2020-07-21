import React from 'react';
<<<<<<< HEAD
=======
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
>>>>>>> 3e50d58be93ca2488542baec827d2289cf37b871
import './App.css';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import Loading from './components/loading/Loading';
import Home from './components/home/Home';

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <h1> Kunligi </h1>
      </header>
=======
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
>>>>>>> 3e50d58be93ca2488542baec827d2289cf37b871
    </div>
  );
}

export default App;
