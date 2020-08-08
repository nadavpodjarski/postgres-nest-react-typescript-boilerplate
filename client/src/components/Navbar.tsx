import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div
      style={{
        height: '64px',
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
      <Link to="/">Home</Link>
      <Link to="/test">Test React Router</Link>
    </div>
  );
};

export default Navbar;
