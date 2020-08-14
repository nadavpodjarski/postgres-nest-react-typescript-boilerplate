import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, IconButton, Checkbox } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import './demo.css';

type Todo = {
  todo: string;
  created_at: string;
  completed: boolean;
  id: number;
};

const header = [
  { id: 'todo', label: 'Todo', minWidth: 320 },
  { id: 'created_at', label: 'Created At', minWidth: 150 },
  { id: 'completed', label: 'Completed', minWidth: 100 }
];

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 550,
    scrollBehavior: 'smooth'
  }
});

const Demo = () => {
  const classes = useStyles();
  const [newTodo, setNewTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const onChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onCompleteTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    sqlId: number
  ) => {
    const { id, checked } = e.target;
    const newTodos = todos;
    const todo = todos.find((todo) => todo.id === sqlId);

    if (todo && id === 'completed') {
      onUpdateTodo(sqlId, checked, id).then((res) => {
        if (res?.status === 200) {
          todo[id] = checked;
          setTodos([...newTodos]);
        }
      });
    }
  };

  const onSubmitCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo) {
      try {
        const res = await axios({
          method: 'POST',
          url: '/api/create_todo',
          data: { todoContent: newTodo }
        });
        if (res.status === 201) {
          setTodos((prevState) => [res.data, ...prevState]);
        }
      } catch (err) {
        console.error(err.response?.data);
      } finally {
        setNewTodo('');
      }
    }
  };

  const onUpdateTodo = async (
    id: number,
    value: string | boolean,
    column: string
  ) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: '/api/update_todo',
        params: { id },
        data: { value, column }
      });
      return response;
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteTodo = async (id: number) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: '/api/delete_todo',
        params: { id },
        data: {}
      });
      if (res.status === 200) {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos([...newTodos]);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/get_todos',
        params: { orderBy: 'created_at' }
      });
      setTodos(res.data.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="demo-wrapper">
      <div className="todolist-wrapper">
        <div
          style={{
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            whiteSpace: 'nowrap'
          }}
        >
          Your Todo List
        </div>
        <div className="form-wrapper">
          <form
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onSubmit={onSubmitCreateTodo}
          >
            <TextField
              variant="outlined"
              style={{ marginBottom: '1rem' }}
              onChange={onChangeNewTodo}
              value={newTodo}
            />
            <Button
              type="submit"
              style={{
                background: '#FF0083',
                color: 'white',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              ADD
            </Button>
          </form>
        </div>
        <div className="table-wrapper">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {header.map((column, i) => (
                      <TableCell
                        key={i}
                        align="left"
                        style={{
                          minWidth: column.minWidth,
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          height: '48px',
                          background: 'black',
                          color: 'white'
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos?.map((todo) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={`${todo.id}_${todo.todo}`}
                      >
                        <TableCell
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '1.2rem'
                          }}
                        >
                          <div
                            style={{
                              textDecoration: todo.completed
                                ? 'line-through'
                                : ''
                            }}
                          >
                            {todo.todo}
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <IconButton onClick={() => onDeleteTodo(todo.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(todo.created_at).toLocaleString('eu')}
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          <Checkbox
                            checked={todo.completed}
                            onChange={(e) => onCompleteTodo(e, todo.id)}
                            id="completed"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Demo;
