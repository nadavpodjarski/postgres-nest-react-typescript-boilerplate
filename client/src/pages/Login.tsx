import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/auth/actions';

const Login = () => {
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setCreds({
      email: '',
      password: ''
    });
  }, []);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setCreds((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authActions.login(creds, history));
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          margin: '30px 0',
          width: '350px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h1>Log In</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>New member?</div>
          <div>
            <Link
              style={{ textDecoration: 'none', marginLeft: '0.5rem' }}
              to="/register"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
      >
        <TextField
          style={{
            margin: '0.5rem 0'
          }}
          variant="outlined"
          id="email"
          type="email"
          onChange={onChangeHandler}
          value={creds.email}
          label="Email"
          required
        />
        <TextField
          style={{ margin: '0.5rem 0' }}
          variant="outlined"
          id="password"
          type="password"
          onChange={onChangeHandler}
          value={creds.password}
          label="Password"
          required
        />
        <Button
          type="submit"
          style={{
            height: '48px',
            background: '#FF0083',
            color: 'white',
            marginTop: '2rem'
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Login;
