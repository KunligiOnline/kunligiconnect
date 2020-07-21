import React, { useState } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';

const Home: React.FC = () => {
  const [response, setResponse] = useState('');

  //   const [socket, setSocket] = useState(null);
  let socket;

  const getStartedHandler = () => {
    // const socket = socketIOClient(ENDPOINT);
    socket = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
    });
    // TODO: lookup userId from state or cookie
    const userId = 1;
    const chatType = 'Deep connection';
    socket.emit('looking', userId, chatType);

    // socket.on('FromAPI', (data: any) => {
    //   setResponse(data);
    //   console.log(data);
    // });
    // socket.on('message', (data: any) => {
    //   console.log(data);
    // });
    // const room = 'room123';
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <button>Deep Connection</button>
          <button>Difficult Topics</button>
        </div>
        <button onClick={getStartedHandler}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
