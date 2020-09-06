import axios from 'axios';

export const getAllTodos = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/todo/all'
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const completeTodo = async (id: string, checked: boolean) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/todo/update',
      params: { id },
      data: { completed: checked }
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const addTodo = async (content: any) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/todo/create',
      data: { content }
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/todo/delete',
      params: { id }
    });
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
