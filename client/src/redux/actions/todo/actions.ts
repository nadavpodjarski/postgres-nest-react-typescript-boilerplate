import { Dispatch } from 'react';
import * as types from './types';
import axios from 'axios';
import { Todo } from '../../../types';
import { setSnackBar } from '../ui/actions';

import { fakeData } from '../../fake/fakeData';
import * as fakeActions from '../../fake/fakeActions';

const createGetAllTodo = () => {
  return {
    type: types.GET_ALL_TODO
  };
};

const createCompleteTodo = () => {
  return {
    type: types.COMPLETE_TODO
  };
};

const createDeleteTodo = () => {
  return {
    type: types.DELETE_TODO
  };
};

const createAddTodo = () => {
  return {
    type: types.ADD_TODO
  };
};

const catchRequestErr = (err: any) => {
  return {
    type: types.REQUEST_FAILURE,
    payload: err.message
  };
};

const getAllTodosSuccess = (data: Todo[]) => {
  return {
    type: types.GET_ALL_TODOS_SUCCESS,
    payload: data
  };
};

const deleteTodoSuccess = (id: string) => {
  return {
    type: types.DELETE_TODO_SUCCESS,
    payload: id
  };
};

const addTodoSuccess = (data: string) => {
  return {
    type: types.ADD_TODO_SUCCESS,
    payload: data
  };
};

const completeTodoSuccess = (data: any) => {
  return {
    type: types.COMPLETE_TODO_SUCCESS,
    payload: data
  };
};

export const resetTodos = () => {
  return {
    type: types.RESET
  };
};

export const getAllTodos = () => (dispatch: Dispatch<any>, getStore: any) => {
  const { isLoggedIn, isFakeData } = getStore().auth;
  /**
   * FAKE DATA HANDLER
   */
  if (isFakeData) {
    dispatch(fakeActions.getFakeData(fakeData));
    return;
  }
  /**
   *
   */
  if (isLoggedIn) {
    dispatch(createGetAllTodo());
    axios({
      method: 'GET',
      url: '/api/todo/all'
    })
      .then((res) => {
        dispatch(getAllTodosSuccess(res.data));
      })
      .catch((err) => {
        dispatch(catchRequestErr(err));
        dispatch(
          setSnackBar({ type: 'error', msg: err.response.data.message })
        );
      });
  }
};

export const completeTodo = (id: string, checked: boolean) => (
  dispatch: Dispatch<any>,
  getStore: any
) => {
  const { isFakeData } = getStore().auth;
  const todos = getStore().todo.todos as Todo[];
  const completedTodo = todos.find((todo) => todo.id === id) as NonNullable<
    Todo
  >;
  completedTodo.completed = checked;
  /**
   * FAKE DATA HANDLER
   */
  if (isFakeData) {
    dispatch(fakeActions.completeFakeTodo(todos));
    dispatch(
      setSnackBar({
        type: 'info',
        msg: `${completedTodo.content} was updated`
      })
    );
    return;
  }
  /**
   *
   */
  dispatch(createCompleteTodo());
  axios({
    method: 'PATCH',
    url: '/api/todo/update',
    params: { id },
    data: { completed: checked }
  })
    .then(() => {
      dispatch(completeTodoSuccess(todos));
      dispatch(
        setSnackBar({
          type: 'info',
          msg: `${completedTodo.content} was updated`
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(catchRequestErr(err));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};

export const addTodo = (content: string) => (
  dispatch: Dispatch<any>,
  getStore: any
) => {
  const { isFakeData } = getStore().auth;
  /**
   * FAKE DATA HANDLER
   */
  if (isFakeData) {
    dispatch(fakeActions.addFakeTodo(content));
    dispatch(setSnackBar({ type: 'success', msg: `${content} was added` }));
    return;
  }
  /**
   *
   */
  dispatch(createAddTodo());
  axios({
    method: 'POST',
    url: '/api/todo/create',
    data: { content }
  })
    .then((res) => {
      dispatch(addTodoSuccess(res.data));
      dispatch(setSnackBar({ type: 'success', msg: `${content} was added` }));
    })
    .catch((err) => {
      dispatch(catchRequestErr(err));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};

export const deleteTodo = (id: string) => (
  dispatch: Dispatch<any>,
  getStore: any
) => {
  const { isFakeData } = getStore().auth;
  const todos = getStore().todo.todos as Todo[];
  const deletedTodo = todos.find((todo) => todo.id === id) as NonNullable<Todo>;
  /**
   * FAKE DATA HANDLER
   */
  if (isFakeData) {
    dispatch(fakeActions.deleteFakeTodo(id));
    dispatch(
      setSnackBar({ type: 'info', msg: `${deletedTodo.content} was deleted` })
    );
    return;
  }
  /**
   *
   */
  dispatch(createDeleteTodo());
  axios({
    method: 'DELETE',
    url: '/api/todo/delete',
    params: { id }
  })
    .then(() => {
      dispatch(deleteTodoSuccess(id));
      dispatch(
        setSnackBar({ type: 'info', msg: `${deletedTodo.content} was deleted` })
      );
    })
    .catch((err) => {
      dispatch(catchRequestErr(err));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};
