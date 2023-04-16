const express = require('express');
const { readFile, writeFile } = require('../utils/fsUtils');

const router = express.Router();

// GET /talker
router.get('/', async (_req, res, next) => {
  try {
    const talkers = await readFile();
    if (!talkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers);
  } catch (error) {
    return next(error);
  }
});

// GET /talker/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const talkers = await readFile();
    const selectedTalker = talkers.find((talker) => talker.id === id);
    if (!selectedTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(selectedTalker);
  } catch (error) {
    return next(error);
  } 
});

// POST /talker
router.post('/', async (req, res, next) => {
  try {
    const talkers = await readFile();
    const { name, age, talk } = req.body;
    const id = talkers[talkers.length - 1].id + 1;
    const newTalker = { name, age, id, talk };
    const updatedTalkers = [...talkers, newTalker];
    await writeFile(updatedTalkers);
    return res.status(201).json(updatedTalkers);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;