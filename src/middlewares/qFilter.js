const { readFile } = require('../utils/fsUtils');

const qFilter = async (req, _res, next) => {
  const talkers = await readFile();
  const { q = '' } = req.query;
  const filteredTalkers = talkers.filter(
    (talker) => talker.name.toUpperCase().includes(q.toUpperCase()),
  );
  req.qFilter = filteredTalkers;
  return next();
};

module.exports = qFilter;