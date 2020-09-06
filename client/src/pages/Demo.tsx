import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Theme } from '@material-ui/core';
import TodosTable from '../containers/TodosTable';
import AddButton from '../components/add-button/AddButton';

import { IStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActions from '../redux/actions/todo/actions';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    whiteSpace: 'nowrap'
  },
  form: {
    width: '100%',
    height: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  formWrapper: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  demoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.rem',
    fontWeight: 'bold',
    height: '100%',
    flexDirection: 'column'
  },
  todoListWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    padding: '16px',

    [theme.breakpoints.down('md')]: {
      width: ' 90%',
      padding: '0 6px 6px 6px'
    }
  },
  userLabel: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '2rem'
  }
}));

const header = [
  { id: 'todo', label: 'Todo', minWidth: 320 },
  { id: 'createdOn', label: 'Created On', minWidth: 150 },
  { id: 'completed', label: 'Completed', minWidth: 100 }
];

const Demo = () => {
  const [newTodo, setNewTodo] = useState<string>('');

  const dispatch = useDispatch();

  const classes = useStyles();

  const todoState = useSelector((state: IStore) => state.todo);
  const authState = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    dispatch(todoActions.getAllTodos());
    return () => {
      dispatch(todoActions.clearTodos());
    };
  }, []);

  const onDeleteTodoHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return (todoId: string) => {
      dispatch(todoActions.deleteTodo(todoId));
    };
  };

  const onAddTodoHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(todoActions.addTodo(newTodo));
      setNewTodo('');
    }
  };

  const onCompleteTodoHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    return (checked: boolean) => {
      return (id: string) => {
        dispatch(todoActions.completeTodo(id, checked));
      };
    };
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setNewTodo(content);
  };

  return (
    <>
      <div className={classes.demoWrapper}>
        <div style={{ height: '64px' }} />
        <div className={classes.todoListWrapper}>
          <div className={classes.userLabel}>
            {authState.currentUser?.email &&
              `Hi, ${authState.currentUser?.email}`}
          </div>
          <div className={classes.title}>Your Todo List</div>
          <div className={classes.formWrapper}>
            <form className={classes.form} onSubmit={onAddTodoHandler}>
              <TextField
                variant="outlined"
                style={{ marginBottom: '1rem' }}
                value={newTodo}
                onChange={onChangeHandler}
              />
              <AddButton />
            </form>
          </div>
          <TodosTable
            isLoading={todoState.isLoading}
            header={header}
            data={todoState.todos}
            stickyHeader={true}
            placeHolder="Nothing to do"
            headerStyle={{ background: 'black' }}
            rowStyle={{ color: 'black', fontSize: '1.5rem' }}
            onDeleteTodo={(e, todoId) => onDeleteTodoHandler(e)(todoId)}
            onCompleteTodo={(e, checked, todoId) =>
              onCompleteTodoHandler(e)(checked)(todoId)
            }
          />
        </div>
      </div>
    </>
  );
};

export default Demo;
