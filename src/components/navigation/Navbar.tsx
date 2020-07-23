import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { IAppState } from '../../store/store';
import { logoutAction } from '../../actions/basicActions';
import { NavLink } from 'react-router-dom';
import * as H from 'history';
import { AppBar, Toolbar, Typography,  Button, Grid } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';

const colour = cyan[200];

const Navbar: React.FC<RouteComponentProps> = (props) => {

  const dispatch = useDispatch();
  
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logoutAction());
  }

  const username = useSelector((state: IAppState) => state.basicState.username);
  if (username === '') {
    return (
        <span className="navbar">
            <AppBar position="static" style={{ background: colour, justifyContent: 'center'}}>
              <Toolbar>
                <Grid container justify="space-between">
                  <Typography variant="h6">
                    Kunligi
                  </Typography>
                </Grid>
              </Toolbar>
            </AppBar>
        </span>
    );
  }

  return (
    <span className="navbar">
      <AppBar position="static" style={{ background: colour, justifyContent: 'center'}}>
        <Toolbar>
          <Grid container justify="space-between">
            <Typography variant="h6">
              Kunligi
            </Typography>

            <Button color="inherit" style={{float:'right'}} onClick={e => logout(e)}>Logout</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </span>
  );
}



export default withRouter(Navbar);
