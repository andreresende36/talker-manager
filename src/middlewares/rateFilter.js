const validateRateSearch = (rate) => {
  const rateNumber = Number(rate);
  if (rateNumber < 1 
    || rateNumber > 5 
    || !Number.isInteger(rateNumber) 
    || Number.isNaN(rateNumber)) {
    return false;
  }
  return true;
};

const rateFilter = async (req, res, next) => {
  const { rate } = req.query;
  const { qFilter } = req;
  if (!rate && rate !== 0) {
    req.rateFilter = qFilter;
    return next();
  }
  if (!validateRateSearch(rate)) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
  }
  const filteredTalkers = qFilter.filter((talker) => talker.talk.rate === Number(rate));
  req.rateFilter = filteredTalkers;
  return next();
};

module.exports = rateFilter;