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
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const onChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onCompleteTodo = (e: any, sqlId: number) => {
    const { id, checked } = e.target;
    const newTodos = todos;
    const todo = todos.find((todo) => todo.id === sqlId);

    if (todo) {
      todo[id as keyof Todo] = checked as never;
    }

    onUpdateTodo(sqlId, checked, id).then((res) => {
      if (res?.status === 200) {
        setTodos([...newTodos]);
      }
    });
  };

  const onSubmitCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo && !isRequesting) {
      setIsRequesting(true);
      try {
        const res = await axios({
          method: 'POST',
          url: '/api/create_todo',
          data: { todo: newTodo }
        });
        if (res.status === 200) {
          await getTodos();
        }
      } catch (err) {
        setIsRequesting(false);
        throw err;
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
    if (!isRequesting) {
      setIsRequesting(true);
      try {
        const response = await axios({
          method: 'PUT',
          url: '/api/update_todo',
          params: { id },
          data: { value, column }
        });
        return response;
      } catch (err) {
        throw err;
      } finally {
        setIsRequesting(false);
      }
    }
  };

  const onDeleteTodo = async (id: number) => {
    if (!isRequesting) {
      setIsRequesting(true);
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
        console.error(err);
      } finally {
        setIsRequesting(false);
      }
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios.get('/api/get_todos');
      setTodos(res.data.data);
    } catch (err) {
      throw err;
    } finally {
      setIsRequesting(false);
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
            fontSize: '3rem'
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
              style={{ background: 'black', color: 'white', padding: '1rem' }}
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
                          fontWeight: 600
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((todo) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={`${todo.id}_${btoa(todo.todo)}`}
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
                          {new Date(todo.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={todo.completed}
                            onClick={(e) => onCompleteTodo(e, todo.id)}
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
