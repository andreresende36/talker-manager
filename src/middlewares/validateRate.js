const validateTypeOfRate = (req) => {
  const { rate } = req.body.talk || req.body;
  const rateNumber = Number(rate);
  return { 
    rate: rateNumber,
    isValid: !(rate === undefined || Number.isNaN(rateNumber)),
  };
};

const validateRate = async (req, res, next) => {
  const { rate, isValid } = validateTypeOfRate(req);
  if (!isValid) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
  }
  return next();
};

module.exports = validateRate;