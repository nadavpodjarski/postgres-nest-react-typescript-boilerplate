import { Action, IUiState } from '../../types';
import * as types from '../actions/ui/types';

const initialState: IUiState = {
  snackbar: { type: undefined, msg: '' }
};

export const uiReducer = (state = initialState, action: Action): IUiState => {
  switch (action.type) {
    case types.SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload
      };
    case types.CLEAR_SNACKBAR:
      return {
        ...state,
        snackbar: { type: undefined, msg: '' }
      };
    default:
      return state;
  }
};
