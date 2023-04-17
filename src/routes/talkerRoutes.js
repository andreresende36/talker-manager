// Importações
const express = require('express');
const { readFile, writeFile } = require('../utils/fsUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const validateTalker = require('../middlewares/validateTalker');
const qFilter = require('../middlewares/qFilter');
const rateFilter = require('../middlewares/rateFilter');
const dateFilter = require('../middlewares/dateFilter');

// Middlewares de Validação
const validations = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate];
const router = express.Router();

// GET /talker
router.get('/', async (_req, res, next) => {
  const talkers = await readFile();
  try {
    if (!talkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers);
  } catch (error) {
    return next(error);
  }
});

// GET /talker/search

const searchValidations = [
  validateToken,
  qFilter,
  rateFilter,
  dateFilter];
router.get('/search', searchValidations, async (req, res, next) => {
  try {
    const { searchResult } = req;
    res.status(200).json(searchResult);
  } catch (error) {
    next(error);
  }
});

// GET /talker/:id
router.get('/:id', validateTalker, async (req, res, next) => {
  try {
    const { selectedTalker } = req;
    return res.status(200).json(selectedTalker);
  } catch (error) {
    return next(error);
  } 
});

// POST /talker
router.post('/', validations, async (req, res, next) => {
  const talkers = await readFile();
  try {
    const { name, age, talk } = req.body;
    const id = talkers[talkers.length - 1].id + 1;
    const newTalker = { name, age, id, talk };
    const updatedTalkers = [...talkers, newTalker];
    await writeFile(updatedTalkers);
    return res.status(201).json(newTalker);
  } catch (error) {
    return next(error);
  }
});

// PUT /talker/:id
router.put('/:id', validations, validateTalker, async (req, res, next) => {
  const talkers = await readFile();
  try {
    const id = Number(req.params.id);
    const { name, age, talk } = req.body;
    const editedTalker = { id, name, age, talk };
    let index;
    const updatedTalkers = talkers.map((talker, i) => {
      if (talker.id === id) {
        index = i;
        return editedTalker;
      }
      return talker;
    });
    await writeFile(updatedTalkers);
    res.status(200).json(updatedTalkers[index]);
  } catch (error) { next(error); }
});

// DELETE /talker:id
router.delete('/:id', validateToken, async (req, res, next) => {
  const talkers = await readFile();
  try {
    const id = Number(req.params.id);
    const updatedTalkers = talkers.filter((talker) => talker.id !== id);
    await writeFile(updatedTalkers);
    res.status(204).end();
  } catch (error) { next(error); }
});

module.exports = router;