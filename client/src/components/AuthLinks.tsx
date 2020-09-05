import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../types';
import { logout } from '../redux/actions/auth/actions';

const AuthLinks = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IStore) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {!authState.isAuthenticated ? (
        <>
          <Link to="/login">Login</Link>
          <span style={{ padding: '0 0.2rem' }}>/</span>
          <Link style={{ fontWeight: 'bold' }} to="/register">
            Register
          </Link>{' '}
        </>
      ) : (
        <Link to="/" onClick={logoutHandler}>
          Logout
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
