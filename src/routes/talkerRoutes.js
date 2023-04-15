const express = require('express');
const { readFile, writeFile } = require('../utils/fsUtils');

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await readFile();
    if(!result){
      return res.status(200).json([]);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send({ message: `Dados não encontrados. Erro: ${error.message}`});
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await readFile();
    const { name, age, talk } = req.body;
    const id = result[result.length - 1].id + 1
    const newTalker = { name, age, id, talk };
    const updatedTalkers = [...result, newTalker];
    await writeFile(updatedTalkers);
    return res.status(201).json(updatedTalkers);
  } catch (error) {
    return res.status(500).send({ message: `Atualização não foi realizada. Erro: ${error.message}`});
  }
});

module.exports = router;