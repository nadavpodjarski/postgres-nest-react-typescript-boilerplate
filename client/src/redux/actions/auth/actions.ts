import * as types from './types';
import { UserCreds } from '../../../types';
import { Dispatch } from 'react';
import axios from 'axios';

import { setSnackBar } from '../ui/actions';
import { setFake } from '../../fake/fakeActions';
import { resetTodos } from '../todo/actions';

const createGetProfile = () => {
  return {
    type: types.GET_PROFILE
  };
};

const createRegister = () => {
  return {
    type: types.REGITSER
  };
};

const createLogin = () => {
  return {
    type: types.LOGIN
  };
};

const registerSuccess = (data: any) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data
  };
};

const loginSuccess = (data: any) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data
  };
};

const getProfileSuccess = (data: any) => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: data
  };
};

const catchAuthRequestErr = (data: any) => {
  return {
    type: types.AUTH_REQUEST_FAILURE,
    payload: data
  };
};

export const login = (creds: UserCreds) => (dispatch: Dispatch<any>) => {
  dispatch(createLogin());

  axios({
    method: 'POST',
    url: '/api/login',
    data: creds
  })
    .then((res) => {
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_TOKEN as string,
        res.data.token
      );
      axios.defaults.headers.common[
        'Autorization'
      ] = `Bearer ${res.data.token}`;
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      dispatch(catchAuthRequestErr(err.response.data));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};

export const register = (creds: UserCreds) => (dispatch: Dispatch<any>) => {
  dispatch(createRegister());

  axios({
    method: 'POST',
    url: '/api/register',
    data: creds
  })
    .then((res) => {
      axios.defaults.headers.common[
        'Autorization'
      ] = `Bearer ${res.data.token}`;
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_TOKEN as string,
        res.data.token
      );
      dispatch(registerSuccess(res.data));
    })
    .catch((err) => {
      dispatch(catchAuthRequestErr(err.response.data));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};

export const getProfile = () => (dispatch: Dispatch<any>) => {
  const token = localStorage.getItem(
    process.env.REACT_APP_LOCAL_TOKEN as string
  );

  if (token) {
    axios.defaults.headers.common['Autorization'] = `Bearer ${token}`;
    dispatch(createGetProfile());
    axios({
      method: 'GET',
      url: '/api/profile',
      headers: {
        Autorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        dispatch(getProfileSuccess(res.data));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  } else {
    dispatch(setFake());
  }
};

export const logout = () => (dispatch: Dispatch<any>) => {
  localStorage.removeItem(process.env.REACT_APP_LOCAL_TOKEN as string);
  dispatch({
    type: types.LOGOUT
  });
};
