import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import Messages from './Messages';
import MessageInput from './MessageInput';
import Question from './Question';

// will include routes to home page and next question and next user
const Chat: React.FC = () => {

  return (
    <div className='chat-section'>
      <Question />
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
