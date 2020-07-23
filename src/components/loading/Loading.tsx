import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import { useHistory } from 'react-router-dom';

const Loading: React.FC = () => {
  let history = useHistory();
  const room = useSelector((state: IAppState) => state.basicState.room);

  //   once a user is assigned a room, redirect them to the chat
  if (room) history.push('/chat');

  return (
    <div className="loading">
      <h1>Finding you a match</h1>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
        <div className="bounce4"></div>
        <div className="bounce5"></div>
      </div>
      <p>
        Please wait while we pair you with someone else interested in a deep
        connection
      </p>
    </div>
  );
};

export default Loading;
