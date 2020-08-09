import express from 'express';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

// postgres configuration
const Pool = pg.Pool;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: 5432
});

app.get('/api/start', (req, res) => {
  res.json({ msg: 'Start building your Postgres-Express-React Application' });
});

app.get('/api/demo', (req, res) => {
  pool
    .connect()
    .then((client) => {
      console.log('connected succecfuly');
      client.query('select Todo,Completed from Todolist', (err, queryRes) => {
        if (err) throw err;
        res.json({ data: queryRes?.rows });
        client.release();
      });
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log('listening at port : ' + PORT);
});
