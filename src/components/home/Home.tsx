import React from 'react';
import Navbar from '../navigation/Navbar';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { createSocketConn } from '../../actions/basicActions';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  // when the user clicks 'Get started', open up a web socket connection in the background
  // as the connection is made and they're waiting for a room, open the loading screen
  const connectToRoom = () => {
    console.log('looking for a room');
    dispatch(createSocketConn());
  };

  return (
    <div>
      <div>
        <button>Deep Connection</button>
        <button>Difficult Topics</button>
      </div>
      <button>
        <Link to="/loading" onClick={connectToRoom}>
          Get Started
        </Link>
      </button>
    </div>
  );
};

export default Home;
