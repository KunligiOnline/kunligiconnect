import React from 'react';
import 'bulma/css/bulma.css';
import Messages from '../chat/Messages';
import MessageInput from '../chat/MessageInput';

// will include routes to home page and next question and next user
const Chat: React.FC = () => {
  return (
    <div>
      <p>Question here</p>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
