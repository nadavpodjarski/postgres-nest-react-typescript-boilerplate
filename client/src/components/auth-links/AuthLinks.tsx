import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../types';
import { userLoggedOut } from '../../redux/actions/auth/actions';

const AuthLinks = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IStore) => state.auth);

  const logoutHandler = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      {authState.currentUser ? (
        <>
          <Link to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </>
      ) : (
        <>
          {!authState.isLoading ? (
            <>
              <Link to="/login">Login</Link>
              <span style={{ padding: '0 0.2rem' }}>/</span>
              <Link style={{ fontWeight: 'bold' }} to="/register">
                Register
              </Link>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default AuthLinks;
