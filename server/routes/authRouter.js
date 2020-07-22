const express = require('express');

const authController = require('../controllers/authController');
const cookieController = require('../controllers/cookieController')
const router = express.Router();

router.post('/login',
  authController.logIn,
  cookieController.setCookie,
  (req, res) => {
  res.status(200).send('login');
});

router.post('/signup',
  authController.signUp,
  (req, res) => {
  res.status(200).json(res.locals.newUser);
});

router.get('/logout',
  cookieController.clearCookie,
  (req, res) => {
  res.status(200).redirect('/login');
});

router.post('/loggedin', 
  cookieController.clearCookie,
  (req, res) => {
  res.status(200).send('logout');
});

module.exports = router;