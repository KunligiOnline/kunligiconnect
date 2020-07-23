import React from 'react';
import {
  Link as RouteLink,
  withRouter,
  useHistory,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSocketConn } from '../../actions/basicActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    chatType: {
        marginLeft: '15px',
        marginRight: '15px',
        padding: '0',
        width: '130px',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#026670',
            color: '#eee'
        }
    },
    homeContainer: {
        marginTop: '70px',
        '& > h1': {
            textAlign: 'center',
            marginBottom: '40px'
        }
    },
    link: {
        color: '#333',
        padding: '15px',
        '&:hover': {
            color: '#eee',
        }
    }
}))

const Home: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
const classes = useStyles();
  // when the user clicks 'Get started', open up a web socket connection in the background
  // as the connection is made and they're waiting for a room, open the loading screen
  const connectToRoom = (chatType: string) => {
    dispatch(createSocketConn(chatType));
  };

  return (
    <div className={classes.homeContainer}>
        <h1>Select the type of conversation you would like to have:</h1>
      <Grid container justify="center" spacing={3}>
          
        <Grid item>
          <Button className={classes.chatType} type="submit" fullWidth variant="contained" color="default">
            <RouteLink
            className={classes.link}
              to="/loading"
              onClick={() => connectToRoom('Deep connection')}
            >
              Deep<br/>connection
            </RouteLink>
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.chatType} type="submit" fullWidth variant="contained" color="default">
            <RouteLink
              className={classes.link}
              to="/loading"
              onClick={() => connectToRoom('Difficult topics')}
            >
              Difficult<br/>Topics
            </RouteLink>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Home);
