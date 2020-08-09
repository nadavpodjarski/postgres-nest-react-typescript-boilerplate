import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

app.get('/api/start', (req, res) => {
  res.json({ msg: 'Start building your Postgres-Express-React Application' });
});

app.get('/api/test', (req, res) => {
  res.json({ msg: 'This is a react router test' });
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log('listening at port : ' + PORT);
});
