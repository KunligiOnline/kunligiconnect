import React from 'react';
import Navbar from '../navigation/Navbar';
import 'bulma/css/bulma.css'
import Messages from './Messages';
import MessageInput from './MessageInput'

// will include routes to home page and next question and next user
const Chat: React.FC = () => {
  return(
    <div>
      <p>Question here</p>
      <Messages/>
      <MessageInput/>
    </div>
  )
}

export default Chat;