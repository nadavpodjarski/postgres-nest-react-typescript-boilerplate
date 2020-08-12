import { Router } from 'express';
import { pool as db } from '../db-config';

export const router = Router();

router.get('/get_todos', async (req, res) => {
  const { orderBy, direction } = req.query;
  try {
    const sqlRes = await db.query(
      `SELECT * FROM Todolist ORDER BY ${orderBy} ${direction}`
    );
    res.json({ data: sqlRes.rows });
  } catch (err) {
    res.status(500).send(`There was an error fetching todos`);
  }
});

router.post('/create_todo', async (req, res) => {
  const { todoContent } = req.body;
  try {
    await db.query(`INSERT INTO Todolist(todo) VALES ($1)`, [todoContent]);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(`There was an error while creating ${todoContent}`);
  }
});

router.put('/update_todo', async (req, res) => {
  const { id } = req.query;
  const { value, column } = req.body;
  try {
    await db.query(`UPDATE Todolist SET ${column} = ${value} WHERE id=${id}`);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(`There was an error while updating`);
  }
});

router.delete('/delete_todo/', async (req, res) => {
  const { id } = req.query;
  try {
    await db.query(`DELETE FROM Todolist WHERE id=${id}`);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(`There was an error while deleting`);
  }
});
