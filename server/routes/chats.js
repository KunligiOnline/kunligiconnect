const express = require('express');

const chatController = require('../controllers/chatController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('Hey!');
});

module.exports = router;
