import express from 'express';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

// postgres configuration
const Client = pg.Client;

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: 5432
});

client
  .connect()
  .then(() => {
    console.log('connected succecfuly');
  })
  .then(() =>
    client.query('select Todo from Todolist', (err, res) => {
      if (err) console.log(err);
      console.log(res);
    })
  );

app.get('/api/start', (req, res) => {
  res.json({ msg: 'Start building your Postgres-Express-React Application' });
});

app.get('/api/test', (req, res) => {
  res.json({ msg: 'This is a react-router test' });
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log('listening at port : ' + PORT);
});
