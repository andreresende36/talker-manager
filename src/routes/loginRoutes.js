const express = require('express');
// const { readFile, writeFile } = require('../utils/fsUtils');
const tokenGenerator = require('../utils/tokenGenerator');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();
const validations = [validateEmail, validatePassword];

router.post('/', validations, async (req, res, next) => {
  try {
    return res.status(200).json({ token: tokenGenerator() });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;