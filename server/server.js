// const path = require('path');
const express = require('express');
const findConnection = require('./helperFunctions/findConnection');
const createChatRoom = require('./helperFunctions/createChatRoom');
const storeMessage = require('./helperFunctions/storeMessage');
const getPrompt = require('./helperFunctions/getPrompt');

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 4000;
// server.listen(3000, '127.0.0.1');

app.use(express.json());

// import controllers
// const chatController = require('./controllers/chatController');
// const cookieController = require('./controllers/cookieController');
// const userController = require('./controllers/userController');
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

// let interval;
const chatQueue = [];

// once socket server is connected, set up event listeners
io.on('connection', (socket) => {
  console.log('New client connected');
  // if there is an interval already, clear it so you don't flood the server
  // if (interval) {
  //   clearInterval(interval);
  // }

  // event listener that looks for a "looking" event from the client
  // the callback checks if there's also someone in the queue who is looking to connect
  // if not, they request is added to the callback queue
  // if so, a new chat is started in the DB and a each client is sent a room number
  socket.on('looking', (userId, chatType) => {
    console.log('Adding userId ', userId, ' to queue: ', chatType);
    let connectionRequest = {
      socketId: socket.id,
      userId,
      chatType,
      socket,
    };
    let partner = findConnection(connectionRequest, chatQueue);
    if (partner) {
      console.log('found a match');
      setUpRoom(connectionRequest, partner);
    } else {
      console.log('no match found');
      chatQueue.push(connectionRequest);
    }
  });

  // when a message is received from the database,
  // this event listener stores the event in the DB and emits the event to the other members of the room
  socket.on('message', (userId, message, promptId, hash) => {
    handleMessage(socket, userId, message, promptId, hash);
  });

  const setUpRoom = async (partner1, partner2) => {
    const roomId = await createChatRoom(partner1.userId, partner2.userId);
    console.log('room id is ', roomId);
    socket.join(roomId);
    partner2.socket.join(roomId);
    io.to(partner1.socketId).emit('room', roomId);
    io.to(partner2.socketId).emit('room', roomId);
    givePrompt(roomId, partner1.chatType);
  };

  const handleMessage = async (socket, userId, message, promptId, hash) => {
    // the storeMessage function creates a message in the database
    // it returns back additional meta data for the message that will be broadcast to the other users
    const messageData = await storeMessage(userId, message, promptId, hash);
    // broadcast message to all users except the original sender
    socket.to(hash).emit('new message', messageData);
  };

  const givePrompt = async (hash, type) => {
    const prompt = await getPrompt(type);
    io.to(hash).emit('prompt', prompt);
  };

  // io.in('room123').emit('message', 'Sup yall from the server!');
  // socket.to('room123').emit('message', 'Sup yall from the server!');
});

app.use((req, res) => res.sendStatus(404));
// start server
// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

server.listen(PORT, '127.0.0.1');

module.exports = app;
