const dateFilter = async (req, res, next) => {
  const { rateFilter } = req;
  const { date = '' } = req.query;
  const dateFormatRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  if (!date) {
    req.searchResult = rateFilter;
    return next();
  }
  if (!dateFormatRegex.test(date)) {
    res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  const filteredTalkers = rateFilter.filter((talker) => talker.talk.watchedAt.includes(date));
  req.searchResult = filteredTalkers;
  return next();
};

module.exports = dateFilter;