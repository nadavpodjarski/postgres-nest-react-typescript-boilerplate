import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [testMsg, setTestMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/test');
      setTestMsg(res.data.msg);
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
    >
      {`${testMsg} ${process.env.REACT_APP_TEST_ENV}`}
    </div>
  );
};

export default Test;
