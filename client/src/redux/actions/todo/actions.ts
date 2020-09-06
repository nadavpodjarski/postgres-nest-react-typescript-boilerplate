import { Dispatch } from 'react';

import * as types from './types';

import { Todo } from '../../../types';
import { setSnackBar } from '../ui/actions';

import * as todoAPI from '../../../api/todo';

//----- GET TODOS ----- //
const createGetAllTodo = () => {
  return {
    type: types.GET_ALL_TODO
  };
};

const getAllTodosSuccess = (data: Todo[]) => {
  return {
    type: types.GET_ALL_TODOS_SUCCESS,
    payload: data
  };
};

export const getAllTodos = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createGetAllTodo());
    const res = await todoAPI.getAllTodos();
    dispatch(getAllTodosSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- COMPLETE TODO ----- //
const createCompleteTodo = () => {
  return {
    type: types.COMPLETE_TODO
  };
};

const completeTodoSuccess = (data: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.COMPLETE_TODO_SUCCESS,
    payload: data
  });
  dispatch(
    setSnackBar({
      type: 'info',
      msg: `Todo was updated`
    })
  );
};

export const completeTodo = (id: string, checked: boolean) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch(createCompleteTodo());
    await todoAPI.completeTodo(id, checked);
    dispatch(completeTodoSuccess({ id, checked }));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- ADD TODO ----- //
const createAddTodo = () => {
  return {
    type: types.ADD_TODO
  };
};
const addTodoSuccess = (data: Todo) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.ADD_TODO_SUCCESS,
    payload: data
  });
  dispatch(setSnackBar({ type: 'success', msg: `${data.content} was added` }));
};
export const addTodo = (content: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createAddTodo());
    const res = await todoAPI.addTodo(content);
    dispatch(addTodoSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- DELETE TODO ----- //
const createDeleteTodo = () => {
  return {
    type: types.DELETE_TODO
  };
};

const deleteTodoSuccess = (id: string) => (disptach: Dispatch<any>) => {
  disptach({
    type: types.DELETE_TODO_SUCCESS,
    payload: id
  });
  disptach(setSnackBar({ type: 'info', msg: 'Todo deleted successfully' }));
};

export const deleteTodo = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createDeleteTodo());
    await todoAPI.deleteTodo(id);
    dispatch(deleteTodoSuccess(id));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

const catchRequestErr = (err: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.REQUEST_FAILURE,
    payload: err.message
  });
  setSnackBar({ type: 'error', msg: err.message });
};

export const clearTodos = () => {
  return {
    type: types.CLEAR_TODOS
  };
};
