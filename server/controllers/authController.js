// import { Request, Response, NextFunction } from "express";
const db = require('../models/model');

const authController = {};

authController.checkUserExists = (req, res, next) => {
  const { username } = req.body;
  const queryText = 'SELECT username FROM public.users WHERE username = $1';
  db.query(queryText, [username])
    .then((data) => {
      if (!data.rows[0]) {
        return next();
      } else {
        // conflict status
        return res.status(409).json('username exists');
      }
    })
    .catch((err) => {
      return next({
        log: `ERROR in authController.checkUserExists:${err}`,
        message: {
          err:
            'authController.checkUserExists: ERROR: Check server log for details.',
        },
      });
    });
};

authController.signUp = (req, res, next) => {
  console.log('IN SIGN UP');
  const { username, email, password } = req.body;
  const queryText = `
  INSERT INTO public.users(username, email, password)
  VALUES ($1, $2, $3) 
  RETURNING *;
  `;
  db.query(queryText, [username, email, password])
    .then((data) => {
      console.log('just added ', data.rows[0]);
      res.locals.newUser = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `ERROR in authController.signUp:${err}`,
        message: {
          err: 'authController.signUp: ERROR: Check server log for details.',
        },
      });
    });
};

authController.logIn = (req, res, next) => {
  const { username, password } = req.body;
  const queryText = 'SELECT password FROM public.users WHERE username = $1';
  db.query(queryText, [username])
    .then((data) => {
      if (data.rows[0].password === password) {
        console.log('username/password validated');
        return next();
      } else {
        console.log('username/password is invalid');
        // unauthorized status
        return res.status(401).json('incorrect username/password');
      }
    })
    .catch((err) =>
      next({
        log: `ERROR in authController.logIn:${err}`,
        message: {
          err: 'authController.logIn: ERROR: Check server log for details.',
        },
      })
    );
};

module.exports = authController;
