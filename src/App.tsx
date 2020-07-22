import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
  return (
    <Router>
    <div>
      <Navbar/>
        <div className='container'>
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path="/loading" component={Loading}/>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={LogIn}/>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

// Route wrapper that redirects to '/login' if user is not logged in
function PrivateRoute( { children, ...rest }: any ) {
  const username = useSelector((state: IAppState) => state.basicState.username);
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

export default App;
