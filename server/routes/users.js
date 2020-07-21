const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('Hey!');
});

module.exports = router;
