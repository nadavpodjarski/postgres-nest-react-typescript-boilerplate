import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../types';
import { logout } from '../redux/actions/auth/actions';
import { usePrivateComponent } from '../hooks/usePrivateComponent';

const AuthLinks = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IStore) => state.auth);

  const LogoutPrivateComp = usePrivateComponent();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {!authState.isLoggedIn && !authState.isLoading ? (
        <>
          <Link to="/login">Login</Link>
          <span style={{ padding: '0 0.2rem' }}>/</span>
          <Link style={{ fontWeight: 'bold' }} to="/register">
            Register
          </Link>
        </>
      ) : (
        <LogoutPrivateComp>
          <Link to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </LogoutPrivateComp>
      )}
    </>
  );
};

export default AuthLinks;
