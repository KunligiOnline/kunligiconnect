import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../store/store';
import { logoutAction } from '../../actions/basicActions';
import { NavLink } from 'react-router-dom';
import * as H from 'history';

const Navbar: React.FC = () => {
  const username = useSelector((state: IAppState) => state.basicState.username);
  const dispatch = useDispatch();

  function login(location: H.LocationDescriptor): H.LocationDescriptor {
    return '/login';
  }
  
  function logout(location: H.LocationDescriptor): H.LocationDescriptor {
    dispatch(logoutAction());
    return '/';
  }

  if (username === '') {
    return (
        <span>
            <h2>Kunligi</h2>
            <NavLink to={login}>Sign In</NavLink>
        </span>
    );
  }

  return (
    <span>
        <h2>Kunligi</h2>
        <NavLink to={logout}>Logout</NavLink>
    </span>
  );
}



export default Navbar;
