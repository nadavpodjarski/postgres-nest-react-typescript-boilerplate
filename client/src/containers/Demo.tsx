import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/demo');
      console.log(res.data);
    })();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        background: 'lightgreen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}
    ></div>
  );
};

export default Test;
