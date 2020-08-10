import express from 'express';
import cors from 'cors';
import { router } from './api/routes/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/api/start', (req, res) => {
  res.json({ msg: 'Start building your Postgres-Express-React Application' });
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log('listening at port : ' + PORT);
});
