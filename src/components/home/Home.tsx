import React, { useState, useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';
import cookieController from '../../../server/controllers/cookieController';

const Home: React.FC = () => {
  const [room, setRoom] = useState<String | null>(null);
  // TODO move this state to the global Redux state
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [prompt, setPrompt] = useState<any>(null);
  if (socket) console.log('socket is ', socket.id);
  //   TODO: pull the userId and promptId from state
  const userId = 1;
  const promptId = 1;
  const chatType = 'Deep connection';
  const message = 'YOO wuddup brotha!';

  //  Set up the websocket connection to the server
  //  save that connection to state
  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    const newSocket = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
    });

    // TODO: lookup userId from state or cookie
    newSocket.emit('looking', userId, chatType);

    setSocket(newSocket);
  }, []);

  // set up listeners after socket is set up
  useEffect(() => {
    // add event listener to wait for a message
    // add that message to state
    if (socket) {
      // add event listener to wait for the assigned room
      // add that room to state
      socket.on('room', (message: string) => {
        console.log(message);
        setRoom(message);
      });

      socket.on('new message', (messageData: any) => {
        console.log('received message ', messageData);
        const newMessages = [...messages];
        newMessages.push(messageData);
        setMessages(newMessages);
      });

      socket.on('prompt', (newPrompt: {}) => {
        console.log('received new prompt ', newPrompt);
        setPrompt(newPrompt);
      });
    }
  }, [socket]);

  const sendMessageHandler = () => {
    if (room) {
      console.log('sending message ');
      socket.emit('message', userId, message, promptId, room);
    }
    // TODO: Save the message to state as well
    // TODO: clear the text input
  };

  const changePromptHandler = () => {
    socket.emit('get new prompt', room, chatType);
  };

  return (
    <div>
      <Navbar />
      <div>
        {prompt ? <p>{prompt.prompt}</p> : ``}
        <div>
          <button>Deep Connection</button>
          <button>Difficult Topics</button>
        </div>
        <button onClick={sendMessageHandler}>Send Message</button>
        <button onClick={changePromptHandler}>Change Prompt</button>
      </div>
      {messages.map((message: any) => (
        <p>{message.message}</p>
      ))}
    </div>
  );
};

export default Home;
