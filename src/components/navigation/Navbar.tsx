import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { IAppState } from '../../store/store';
import { logoutAction } from '../../actions/basicActions';
import { useHistory, NavLink } from 'react-router-dom';
import * as H from 'history';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography,  Button } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';

const colour = '#026670';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar: React.FC<RouteComponentProps> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logoutAction());
    props.history.push('/login');
  }

  const username = useSelector((state: IAppState) => state.basicState.username);
  if (username === '') {
    return (
      <div className={classes.root}>
          <AppBar position="static" style={{ background: colour, justifyContent: 'center'}}>
            <Toolbar>
              <Typography variant="h4" className={classes.title}>
                Kunligi
              </Typography>
              {/* <Button color="inherit" onClick={() => history.push('/login')}>Login</Button> */}
            </Toolbar>
          </AppBar>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: colour, justifyContent: 'center'}}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Kunligi
          </Typography>
          <Button color="inherit" 
            style={{float:'right'}} 
            onClick={(e) => logout(e)}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);
