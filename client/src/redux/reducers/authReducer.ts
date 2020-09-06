import { IAuth, Action } from '../../types';
import * as types from '../actions/auth/types';

const initialState: IAuth = {
  isLoading: true,
  currentUser: null,
  err: ''
};

export const authReducer = (state = initialState, action: Action): IAuth => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case types.REGITSER:
      return {
        ...state,
        isLoading: true
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case types.GET_PROFILE:
      return {
        ...state,
        isLoading: true
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        err: '',
        currentUser: action.payload
      };
    case types.AUTH_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoading: false,
        currentUser: null
      };
    default:
      return state;
  }
};
