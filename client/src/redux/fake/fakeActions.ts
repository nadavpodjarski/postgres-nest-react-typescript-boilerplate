import * as types from '../fake/fakeTypes';

export const addFakeTodo = (content: string) => {
  return {
    type: types.ADD_FAKE_TODO,
    payload: {
      id: Math.random().toString(),
      content: content,
      createdOn: Date.now(),
      completed: false
    }
  };
};

export const getFakeData = (fakeData: any) => {
  return {
    type: types.GET_FAKE_DATA,
    payload: fakeData
  };
};

export const deleteFakeTodo = (id: string) => {
  return {
    type: types.DELETE_FAKE_TODO,
    payload: id
  };
};

export const completeFakeTodo = (data: any) => {
  return {
    type: types.COMPLETE_FAKE_TODO,
    payload: data
  };
};

export const setFake = () => {
  return {
    type: types.SET_FAKE
  };
};
