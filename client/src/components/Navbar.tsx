import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const Navbar = () => {
  return (
    <div
      style={{
        height: '80px',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '1rem',
        background: 'white',
        boxShadow: '0 0 8px 3px rgba(0,0,0,0.2)'
      }}
      className="navbar"
    >
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
    </div>
  );
};

export default Navbar;
