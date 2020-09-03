import * as types from './types';
import axios from 'axios';
import { Todo } from '../../../types';

const makeRequest = () => {
  return {
    type: types.MAKE_REQUEST,
    payload: true
  };
};

const catchRequestErr = (err: any) => {
  return {
    type: types.REQUEST_FAILURE,
    payload: err
  };
};

const getAllTodosSuccess = (data: Todo[]) => {
  return {
    type: types.GET_ALL_TODOS,
    payload: data
  };
};

const deleteTodoSuccess = (id: string) => {
  return {
    type: types.DELETE_TODO,
    payload: id
  };
};

const addTodoSuccess = (data: string) => {
  return {
    type: types.ADD_TODO,
    payload: data
  };
};

const completeTodoSuccess = (data: any) => {
  return {
    type: types.COMPLETE_TODO,
    payload: data
  };
};

export const getAllTodos = () => {
  return (dispatch: any) => {
    dispatch(makeRequest());
    axios
      .get('/api/todo/all')
      .then((res) => {
        dispatch(getAllTodosSuccess(res.data));
      })
      .catch((err) => {
        dispatch(catchRequestErr(err));
      });
  };
};

export const completeTodo = (id: string, checked: boolean) => {
  return (dispatch: any, getStore: any) => {
    dispatch(makeRequest());
    axios({
      method: 'PATCH',
      url: '/api/todo/update',
      params: { id },
      data: { completed: checked }
    })
      .then(() => {
        const { todos } = getStore().todo;
        const completedTodo = todos.find((todo: any) => todo.id === id);
        if (completedTodo) {
          completedTodo['completed'] = checked;
          dispatch(completeTodoSuccess(todos));
        } else throw new Error('cannot find todo');
      })
      .catch((err) => {
        dispatch(catchRequestErr(err));
      });
  };
};

export const addTodo = (content: string) => (dispatch: any) => {
  dispatch(makeRequest());
  axios({
    method: 'POST',
    url: '/api/todo/create',
    data: { content }
  })
    .then((res) => {
      dispatch(addTodoSuccess(res.data));
    })
    .catch((err) => {
      dispatch(catchRequestErr(err));
    });
};

export const deleteTodo = (id: string) => (dispatch: any) => {
  dispatch(makeRequest());
  axios({
    method: 'DELETE',
    url: '/api/todo/delete',
    params: { id }
  })
    .then(() => {
      dispatch(deleteTodoSuccess(id));
    })
    .catch((err) => {
      dispatch(catchRequestErr(err));
    });
};
