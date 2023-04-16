const validateWatchedAt = async (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateFormatRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateFormatRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

module.exports = validateWatchedAt;