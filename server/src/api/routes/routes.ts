import { Router } from 'express';
import { pool as db } from '../db-config';

export const router = Router();

router.get('/get_todos', async (req, res) => {
  const { orderBy } = req.query;
  let sqlRes;
  try {
    switch (orderBy) {
      case 'created_at':
        sqlRes = await db.query(
          `SELECT * FROM Todolist ORDER BY created_at DESC`
        );
        break;
      default:
        break;
    }
    res.json({ data: sqlRes?.rows });
  } catch (err) {
    res.status(500).send(`There was an error fetching todos`);
  }
});

router.post('/create_todo', async (req, res) => {
  const { todoContent } = req.body;
  try {
    const sqlRes = await db.query(
      'INSERT INTO Todolist(todo) VALUES ($1) RETURNING *',
      [todoContent]
    );
    res.status(201).send(sqlRes.rows[0]);
  } catch (err) {
    res.status(500).send(`There was an error while creating ${todoContent}`);
  }
});

router.put('/update_todo', async (req, res) => {
  const { id } = req.query;
  const { value, column } = req.body;
  try {
    switch (column) {
      case 'completed':
        await db.query('UPDATE Todolist SET completed = $1 WHERE id = $2', [
          value,
          id
        ]);
        break;
      default:
        break;
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send(`There was an error while updating`);
  }
});

router.delete('/delete_todo/', async (req, res) => {
  const { id } = req.query;
  try {
    await db.query('DELETE FROM Todolist WHERE id=$1', [id]);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(`There was an error while deleting`);
  }
});
