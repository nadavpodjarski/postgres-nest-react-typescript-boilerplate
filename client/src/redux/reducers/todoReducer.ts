import * as types from '../actions/todo/types';
import { ITodoState, Action } from '../../types';

const initialState: ITodoState = {
  todos: [],
  isLoading: false,
  err: ''
};

export const todoReducer = (
  state = initialState,
  action: Action
): ITodoState => {
  switch (action.type) {
    case types.MAKE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case types.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        isLoading: false
      };
    case types.DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos.filter((item) => item.id !== action.payload)],
        isLoading: false
      };
    case types.GET_ALL_TODOS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false
      };
    case types.COMPLETE_TODO:
      return {
        ...state,
        isLoading: false,
        todos: [...action.payload]
      };
    default:
      return state;
  }
};
