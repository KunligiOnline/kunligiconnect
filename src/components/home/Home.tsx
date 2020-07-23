import React from 'react';
import {
  Link as RouteLink,
  withRouter,
  useHistory,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSocketConn } from '../../actions/basicActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import cyan from '@material-ui/core/colors/cyan';

const color1 = cyan[400];
const color2 = cyan[900];
const color3 = cyan[100];

const Home: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  // when the user clicks 'Get started', open up a web socket connection in the background
  // as the connection is made and they're waiting for a room, open the loading screen
  const connectToRoom = (chatType: string) => {
    console.log('looking for a room');
    dispatch(createSocketConn(chatType));
  };

  return (
    <div>
      <Grid container justify="flex-end">
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="default">
            <RouteLink
              to="/loading"
              onClick={() => connectToRoom('Deep connection')}
            >
              Deep connection
            </RouteLink>
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="default">
            <RouteLink
              to="/loading"
              onClick={() => connectToRoom('Difficult topics')}
            >
              Difficult Topics
            </RouteLink>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Home);
