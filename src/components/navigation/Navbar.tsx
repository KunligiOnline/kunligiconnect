import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../store/store';
import { logoutAction } from '../../actions/basicActions';
import { NavLink } from 'react-router-dom';
import * as H from 'history';
import { AppBar, Toolbar, Typography,  Button } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';

const colour = '#026670';

const Navbar: React.FC = () => {

  // const dispatch = useDispatch();

  // function login(location: H.LocationDescriptor): H.LocationDescriptor {
  //   return '/login';
  // }
  
  // function logout(location: H.LocationDescriptor): H.LocationDescriptor {
  //   dispatch(logoutAction());
  //   return '/';
  // }

  const username = useSelector((state: IAppState) => state.basicState.username);
  if (username === '') {
    return (
        <span className="navbar">
            <AppBar position="static" style={{ background: colour, justifyContent: 'center'}}>
              <Toolbar>
                <Typography variant="h6">
                  Kunligi
                </Typography>
                <Button color="inherit" style={{float:'right'}}>Login</Button>
              </Toolbar>
            </AppBar>
            {/*<NavLink id="link" to='/login'>Sign Up</NavLink>*/}
        </span>
    );
  }

  return (
    <span className="navbar">
        <h2 id="Header">Kunligi</h2>
        <button className="logout-button"><NavLink id="link" to="/" >Logout</NavLink></button>
    </span>
  );
}



export default Navbar;
