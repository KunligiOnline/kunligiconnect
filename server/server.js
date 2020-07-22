// const path = require('path');
const express = require('express');

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const cors = require('cors');

// const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// import routes
const chatRouter = require('./routes/chats');
const userRouter = require('./routes/users');

// import controllers
const chatController = require('./controllers/chatController');
const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');


app.use('/chat', chatRouter);
app.use('/user', userRouter);

// app.use('/auth', authRouter);

app.post('/login',
  authController.checkUserNotFound,
  authController.logIn,
  cookieController.setCookie,
  (req, res) => {
  res.status(200).json(res.locals);
});

app.post('/signup', 
  authController.checkUserExists,
  authController.signUp,
  (req, res) => {
  res.status(200).json(res.locals);
});

app.get('/logout',
  cookieController.clearCookie,
  (req, res) => {
  res.status(200).json('successful logout');
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

/* express error handler
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

io.on('connection', (socket) => {
  console.log('a user connected');
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;



