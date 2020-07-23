import React, { useState } from 'react';
// import 'bulma/css/bulma.css';
import '../../styles/bulmaStyles.scss';
import Messages from './Messages';
import MessageInput from './MessageInput';
import Question from './Question';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import { useHistory } from 'react-router-dom';

// will include routes to home page and next question and next user
const Chat: React.FC = () => {
  let history = useHistory();
  const room = useSelector((state: IAppState) => state.basicState.room);

  //   once a user is assigned a room, redirect them to the chat
  if (!room) history.push('/loading');


  return (
    <div className='chat-section'>
      <Question />
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
