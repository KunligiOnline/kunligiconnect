const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// import controllers
const chatController = require('./controllers/starWarsController');
const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');

app.get('/test', (req, res) => res.status(200).send('hello'));

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
