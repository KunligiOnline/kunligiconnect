// import { Request, Response, NextFunction } from "express";
const db = require('../models/model');
const SALT_WORK_FACTOR = 8;
const bcrypt = require('bcryptjs');
const authController = {};

authController.checkUserExists = (req, res, next) => {
  const { username } = req.body;
  const queryText = 'SELECT username FROM public.users WHERE username = $1';
  db.query(queryText, [username])
    .then((data) => {
      if (!data.rows[0]) {
        res.locals.message = "username not found";
        return next();
      } else {
        // conflict status
        res.locals.message = "username exists";
        return res.status(409).json(res.locals);
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

authController.checkUserNotFound = (req, res, next) => {
  const { username } = req.body;
  const queryText = 'SELECT username FROM public.users WHERE username = $1';
  db.query(queryText, [username])
    .then((data) => {
      if (!data.rows[0]) {
        console.log('username not yet taken in database');
        res.locals.message = "username not found";
        return res.status(409).json(res.locals);
      } else {
        // conflict status
        res.locals.message = "username exists";
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: `ERROR in authController.checkUserNotFound:${err}`,
        message: {
          err:
            'authController.checkUserNotFound: ERROR: Check server log for details.',
        },
      });
    });
};


authController.signUp = async (req, res, next) => {
  let { username, email, password } = req.body;
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next({
        log: `bcrypt password hashing error: ${err}`,
        message: {
          err: `bcrypt hash error: check server logs for details`,
        },
      })
    }
    password = hash;
    const queryText = `
    INSERT INTO public.users(username, email, password)
    VALUES ($1, $2, $3) 
    RETURNING *;
    `;
    db.query(queryText, [username, email, password])
      .then((data) => {
        console.log('just added ', data.rows[0]);
        res.locals.newUser = data.rows[0];
        res.locals.message = "success";
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
  })
  
};

authController.logIn = (req, res, next) => {
  
  const { username, password } = req.body;
  const queryText = 'SELECT id, password FROM public.users WHERE username = $1';
  db.query(queryText, [username])
    .then((data) => {
      console.log('inside authcontroller login, data: ');
      console.log(data.rows[0].password);
      bcrypt.compare(password, data.rows[0].password).then( (isMatch) => {
        if (isMatch) {
          console.log('username/password validated');
          const id = data.rows[0].id;
          res.locals.currentUser = { username, id };
          return next();
        } else {
          console.log('password is invalid');
          // unauthorized status
          res.locals.message = "invalid password";
          return next();
        }
      })
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
