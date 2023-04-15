const express = require('express');
const { readFile, writeFile } = require('../utils/fsUtils');
const tokenGenerator = require('../utils/tokenGenerator');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    return res.status(200).json({ token: tokenGenerator() });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;