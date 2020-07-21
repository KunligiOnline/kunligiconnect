import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import { logoutAction } from '../../actions/basicActions';
import { NavLink } from 'react-router-dom';
import * as H from 'history';

const Navbar: React.FC = () => {
  const displayName = useSelector((state: IAppState) => state.basicState.displayName);
  if (displayName === '') {
    return (
        <span>
            <h2>Kunligi</h2>
            <NavLink to='/login'>Sign In</NavLink>
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

function logout(location: H.LocationDescriptor): H.LocationDescriptor {

  return '/';
}



export default Navbar;