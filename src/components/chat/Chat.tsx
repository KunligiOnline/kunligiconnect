import React, { useState, useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import Messages from '../chat/Messages';
import MessageInput from '../chat/MessageInput';
import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:4001';
// const ENDPOINT = 'http://localhost:4000/';

// will inlcude outes to home page and next question and next user
const Chat: React.FC = () => {
  //   const [loadClient, setLoadClient] = useState(true);
  const [response, setResponse] = useState('');
  

  // useEffect(() => {
  //   // const socket = socketIOClient(ENDPOINT);
  //   const socket = socketIOClient('http://localhost:4000', {
  //     transports: ['websocket'],
  //   });

  //   socket.on('FromAPI', (data: any) => {
  //     setResponse(data);
  //     console.log(data);
  //   });
  //   socket.on('message', (data: any) => {
  //     console.log(data);
  //   });
  //   const room = 'room123';
  //   socket.emit('room', room);
  // }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <p>Question here</p>
          {/* <button onClick={() => setLoadClient((prevState) => !prevState)}>
            TEST
          </button> */}
          <p>
            It's <time dateTime={response}>{response}</time>
          </p>
        </div>
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
