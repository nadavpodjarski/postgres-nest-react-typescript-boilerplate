import axios from 'axios';
import { UserCreds } from '../../types';
import * as utils from '../../utils';

export const registerUser = async (creds: UserCreds) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/register',
      data: creds
    });

    utils.setAxiosAuthToken(res.data.token);
    utils.setLocalStorageToken(res.data.token);

    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const loginUser = async (creds: UserCreds) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/login',
      data: creds
    });

    utils.setAxiosAuthToken(res.data.token);
    utils.setLocalStorageToken(res.data.token);

    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const getProfile = async (token: string) => {
  try {
    utils.setAxiosAuthToken(token);
    const res = await axios({
      method: 'GET',
      url: '/api/profile',
      headers: {
        Autorization: `Bearer ${token}`
      }
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
