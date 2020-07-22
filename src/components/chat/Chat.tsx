import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import Messages from '../chat/Messages';
import MessageInput from '../chat/MessageInput';

// will include routes to home page and next question and next user
const Chat: React.FC = () => {
  // const [prompt, setPrompt] = useState<any>(null);
  // const [messages, setMessages] = useState<string[]>([]);
  // const userId = 1;
  // const promptId = 1;
  // const chatType = 'Deep connection';
  // const message = 'YOO wuddup brotha!';
  // const sendMessageHandler = () => {
  //   if (room) {
  //     console.log('sending message ');
  //     socket.emit('message', userId, message, promptId, room);
  //   }
  //   // TODO: Save the message to state as well
  //   // TODO: clear the text input
  // };

  // const changePromptHandler = () => {
  //   socket.emit('get new prompt', room, chatType);
  // };

  // socket.on('new message', (messageData: any) => {
  //   console.log('received message ', messageData);
  //   const newMessages = [...messages];
  //   newMessages.push(messageData);
  //   setMessages(newMessages);
  // });

  // socket.on('prompt', (newPrompt: {}) => {
  //   console.log('received new prompt ', newPrompt);
  //   setPrompt(newPrompt);
  // });
  

  return (
    <div>
      <p>Question here</p>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
