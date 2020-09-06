import React from 'react';

import { Link } from 'react-router-dom';
import { Button, makeStyles, Grid } from '@material-ui/core';

import AuthLinks from '../components/auth-links/AuthLinks';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: '80px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'white',
    boxShadow: '0 0 8px 3px rgba(0,0,0,0.2)',
    zIndex: 999,
    padding: '0 16px',
    [theme.breakpoints.down('md')]: {
      padding: '0 8px'
    }
  },
  navLinks: {
    '& > a': {
      margin: '0 0.3rem'
    }
  },
  authLinks: {
    '& > a': {
      textDecoration: 'none',
      color: 'black'
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.navbar}
    >
      <Grid item className={classes.navLinks}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link to="/">
              <Button
                style={{
                  textDecoration: 'none',
                  border: '2px black solid',
                  height: '48px',
                  width: '80px'
                }}
              >
                Home
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/demo">
              <Button
                style={{
                  background: 'black',
                  color: 'white',
                  textDecoration: 'none',
                  height: '48px',
                  width: '80px'
                }}
              >
                Demo
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.authLinks}>
        <AuthLinks />
      </Grid>
    </Grid>
  );
};

export default Navbar;
