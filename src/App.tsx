import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAppState } from './store/store';
import './App.css';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import Loading from './components/loading/Loading';
import Home from './components/home/Home';
import Navbar from './components/navigation/Navbar';

function App() {
  return (
    <Router>
    <div>
      <Navbar/>
        <div>
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path="/loading" component={Loading}/>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
            <Route path="/" component={Login}/>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

// Route wrapper that redirects to '/login' if user is not logged in
function PrivateRoute( { children, ...rest }: any ) {
  const displayName = useSelector((state: IAppState) => state.basicState.displayName);
  return (
    <Route
      {...rest}
      render={({ location }) => 
        displayName !== '' ? (
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

export default App;
