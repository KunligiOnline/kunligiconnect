import React, { useState, useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import { useHistory } from 'react-router-dom';

const Loading: React.FC = () => {
  let history = useHistory();
  const room = useSelector((state: IAppState) => state.basicState.room);

  //   once a user is assigned a room, redirect them to the chat
  if (room) history.push('/chat');
  console.log('room in state is ', room);

  return (
    <div>
      <h3>Finding you a match...</h3>
      <p>
        Please wait, we're pairing you with someone else interested in a deep
        connection
      </p>
    </div>
  );
};

export default Loading;
