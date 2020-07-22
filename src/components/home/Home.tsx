import React, { useState, useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';

const Home: React.FC = () => {
  const [room, setRoom] = useState<String | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);
  if (socket) console.log('socket is ', socket.id);
  //   TODO: pull the userId and promptId from state
  const userId = 1;
  const promptId = 1;

  //   Set up the websocket connection to the server
  //  save that connection to state
  useEffect(() => {
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
    newSocket.on('new message', (message: string) => {
      console.log(
        'received message ',
        JSON.stringify(message),
        ' of type ',
        typeof message
      );
      //   const newMessages = { ...messages };
      //   newMessages.push(message);
      //   setMessages(newMessages);
    });

    setSocket(newSocket);
  }, []);

  const sendMessageHandler = () => {
    console.log('the socket sending this is ', socket);
    if (room) {
      console.log('sending message ');
      socket.emit('message', userId, 'YOO wuddup brotha!', promptId, room);
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
        <button>Get Started</button>
      </div>
      {messages.map((message: string) => (
        <p>{message}</p>
      ))}
    </div>
  );
};

export default Home;
