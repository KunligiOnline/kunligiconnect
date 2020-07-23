import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSocketConn } from '../../actions/basicActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
      <Grid container justify="flex-end">
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="default">
            Deep Connection
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="default">
            Difficult Topics
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="default">
            <Link to="/loading" onClick={connectToRoom}>
              Get Started
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
