import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

app.get('/api/start', (req, res) => {
  res.json({ msg: 'Start building your Express-React Application' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('listening at port : ' + PORT);
});
