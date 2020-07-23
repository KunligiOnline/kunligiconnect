import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAppState } from './store/store';
import './App.css';
import LogIn from './components/login/Login';
import Chat from './components/chat/Chat';
import Loading from './components/loading/Loading';
import Home from './components/home/Home';
import Navbar from './components/navigation/Navbar';
import SignUp from './components/login/SignUp';

function App() {
  let history = useHistory();
  const username = useSelector((state: IAppState) => state.basicState.username);
  return (
    <Router>
    <div>
      <Navbar/>
        <div className='container'>
          <Switch>
            <Route exact path="/">
              <Redirect from="/" to="/home" />
            </Route>
            <Route path="/chat" component={Chat}/>
            <Route path="/loading" component={Loading}/>
            <PrivateRoute username={username} path="/home">
              <Home/>
            </PrivateRoute>
            <LoggedOffRoute username={username}>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn}/>
            </LoggedOffRoute>
          </Switch>
        </div>
    </div>
    </Router>
  );
}



// Route wrapper that redirects to '/login' if user is not logged in
function PrivateRoute( { children, ...rest }: any ) {
  // const username = useSelector((state: IAppState) => state.basicState.username);
  let { username } = rest;
  return (
    <Route
      {...rest}
      render={({ location }) => 
        username !== '' ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }}
          />
        )
      }
    />
  );
}


// Route wrapper that redirects to '/login' if user is not logged in
function LoggedOffRoute( { children, ...rest }: any ) {
  // const username = useSelector((state: IAppState) => state.basicState.username);
  let { username } = rest;
  return (
    <Route
      {...rest}
      render={({ location }) => 
        username !== '' ? (
          <Redirect to={{
            pathname: '/home',
            state: { from: location }
          }}
          />
        ) : (
          children
        )
      }
    />
  );
}



export default App;
