import { IAuth, Action } from '../../types';
import * as types from '../actions/auth/types';
import { SET_FAKE } from '../fake/fakeTypes';

const initialState: IAuth = {
  isFakeData: false,
  isLoading: true,
  isLoggedIn: false,
  currentUser: {},
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
        isLoggedIn: true,
        isFakeData: false,
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
        isFakeData: false,
        currentUser: action.payload,
        isLoggedIn: true
      };
    case types.GET_PROFILE:
      return {
        ...state,
        isLoading: true
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isFakeData: false,
        isLoading: false,
        isLoggedIn: true,
        err: '',
        currentUser: action.payload
      };
    case types.AUTH_REQUEST_FAILURE:
      return {
        ...state,
        isFakeData: true,
        isLoading: false,
        err: action.payload
      };
    case types.LOGOUT:
      return {
        ...state,
        isFakeData: true,
        isLoading: false,
        isLoggedIn: false,
        currentUser: {}
      };
    case SET_FAKE:
      return {
        ...state,
        isFakeData: true,
        isLoading: false
      };

    default:
      return state;
  }
};
