const { readFile } = require('../utils/fsUtils');

const searchFilter = async (req, res, next) => {
  const talkers = await readFile();
  const { q = '', rate } = req.query;
  const qFilter = talkers.filter(
    (talker) => talker.name.toUpperCase().includes(q.toUpperCase()),
  );
  if (!rate || rate === '') {
    req.searchResult = qFilter;
    return next();
  }
  const rateFilter = qFilter.filter((talker) => talker.talk.rate === Number(rate));
  req.searchResult = rateFilter;
  next();
};

module.exports = searchFilter;