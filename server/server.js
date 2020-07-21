// const path = require('path');
const express = require('express');

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 4000;
// server.listen(3000, '127.0.0.1');

app.use(express.json());

// import controllers
const chatController = require('./controllers/chatController');
const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');
const chatRouter = require('./routes/chats');
const userRouter = require('./routes/users');
const cors = require('cors');

// catch-all route handler for any requests to an unknown route
app.use(cors());
io.set('origins', '*:*');

app.use('/chat', chatRouter);
app.use('/user', userRouter);

app.get('/test', (req, res) => res.status(200).send('hello'));

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

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

let interval;

io.on('connection', (socket) => {
  console.log('New client connected');
  // if there is an interval already, clear it so you don't flood the server
  if (interval) {
    clearInterval(interval);
  }
  // Set an interval that will send the date every second
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  // clear interval on disconnect to avoid flooding the server
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

app.use((req, res) => res.sendStatus(404));
// start server
// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

server.listen(4000, '127.0.0.1');

module.exports = app;
