import React, { useState } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';

const Home: React.FC = () => {
  const [room, setRoom] = useState<String | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);
  //   let socket: any;
  const userId = 1;
  //   TODO: delete

  //   Set up the websocket connection to the server
  //  save that connection to state
  const getStartedHandler = () => {
    // const socket = socketIOClient(ENDPOINT);
    const newSocket = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
    });

    // TODO: lookup userId from state or cookie
    const chatType = 'Deep connection';
    newSocket.emit('looking', userId, chatType);

    // add event listener to wait for the assigned room
    // add that room to state
    newSocket.on('room', (message: string) => {
      console.log(message);
      setRoom(message);
    });

    // add event listener to wait for a message
    // add that message to state
    newSocket.on('message', (message: string, userName: string) => {
      const newMessages = { ...messages };
      newMessages.push(message);
      setMessages(newMessages);
    });

    setSocket(newSocket);
  };

  const sendMessageHandler = () => {
    // only send a message if this chat is associated with a room
    console.log('the socket is');
    if (room) {
      socket.emit('message', 'YOO wuddup brotha!', userId);
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
      {messages.map((message: string) => (
        <p>{message}</p>
      ))}
    </div>
  );
};

export default Home;
