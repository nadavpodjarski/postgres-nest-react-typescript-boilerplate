import * as types from './types';
import { UserCreds } from '../../../types';
import { Dispatch } from 'react';
import axios from 'axios';
import { setSnackBar } from '../ui/actions';

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
      axios.defaults.headers.common[
        'Autorization'
      ] = `Bearer ${res.data.token}`;
      dispatch(loginSuccess(res.data));
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_TOKEN as string,
        res.data.token
      );
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
      dispatch(registerSuccess(res.data));
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_TOKEN as string,
        res.data.token
      );
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
      url: '/api/profile'
    })
      .then((res) => {
        dispatch(getProfileSuccess(res.data));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }
};

export const logout = () => {
  axios.defaults.headers['Autorization'] = '';
  localStorage.removeItem(process.env.REACT_APP_LOCAL_TOKEN as string);
  return {
    type: types.LOGOUT
  };
};
