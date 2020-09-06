import * as types from './types';
import { UserCreds } from '../../../types';
import { Dispatch } from 'react';

import { setSnackBar } from '../ui/actions';

import * as authAPI from '../../../api/auth';
import * as utils from '../../../utils';

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

const catchAuthRequestErr = (err: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.AUTH_REQUEST_FAILURE,
    payload: err.message
  });
  console.log(err);
  dispatch(setSnackBar({ type: 'error', msg: err.message }));
};

export const login = (creds: UserCreds, history: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch(createLogin());
    const res = await authAPI.loginUser(creds);
    dispatch(loginSuccess(res.data));
    history.push('/demo');
  } catch (err) {
    dispatch(catchAuthRequestErr(err));
  }
};

export const register = (creds: UserCreds, history: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch(createRegister());
    const res = await authAPI.registerUser(creds);
    dispatch(registerSuccess(res.data));
    history.push('/demo');
  } catch (err) {
    dispatch(catchAuthRequestErr(err));
  }
};

export const getProfile = (history: any) => async (dispatch: Dispatch<any>) => {
  const token = utils.getLocalStorageToken();

  if (token) {
    try {
      dispatch(createGetProfile());
      const res = await authAPI.getProfile(token);
      dispatch(getProfileSuccess(res.data));
      history.push('/demo');
    } catch (err) {
      dispatch(catchAuthRequestErr(err));
    }
  } else {
    dispatch(userLoggedOut());
  }
};

export const userLoggedOut = () => (dispatch: Dispatch<any>) => {
  localStorage.removeItem(process.env.REACT_APP_LOCAL_TOKEN as string);
  dispatch({
    type: types.LOGOUT
  });
};
