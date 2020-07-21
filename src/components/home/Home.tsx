import React, { useState } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';

const Home: React.FC = () => {
  const [room, setRoom] = useState<String | null>(null);

  let socket: any;

  const getStartedHandler = () => {
    // const socket = socketIOClient(ENDPOINT);
    socket = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
    });
    // TODO: lookup userId from state or cookie
    const userId = 1;
    const chatType = 'Deep connection';
    socket.emit('looking', userId, chatType);

    socket.on('room', (message: string) => {
      console.log(message);
      setRoom(message);
    });
  };

  const sendMessageHandler = () => {
    // only send a message if this chat is associated with a room
    if (room) {
      socket.emit('message', 'YOO wuddup brotha!');
    }
    // TODO: Save the message to state as well
    // TODO: clear the text input
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <button>Deep Connection</button>
          <button>Difficult Topics</button>
        </div>
        <button onClick={sendMessageHandler}>Send Message</button>
        <button onClick={getStartedHandler}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
