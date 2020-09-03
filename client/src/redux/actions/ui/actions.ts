import * as types from './types';
import { SnackBarAlert } from '../../../types';

export const setSnackBar = (data: SnackBarAlert) => {
  return {
    type: types.SET_SNACKBAR,
    payload: data
  };
};

export const clearSetSnackBar = () => {
  return {
    type: types.CLEAR_SNACKBAR
  };
};
