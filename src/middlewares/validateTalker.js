const { readFile } = require('../utils/fsUtils');

const validateTalker = async (req, res, next) => {
  const id = Number(req.params.id);
  const talkers = await readFile();
  const selectedTalker = talkers.find((talker) => talker.id === id);
  if (!selectedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  req.selectedTalker = selectedTalker;
  return next();
};

module.exports = validateTalker;