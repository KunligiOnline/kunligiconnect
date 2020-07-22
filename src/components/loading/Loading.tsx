import React, { useState, useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import { useHistory } from 'react-router-dom';

const Loading: React.FC = () => {
  //   const [room, setRoom] = useState<String | null>(null);
  //   // TODO move this state to the global Redux state
  //   const [socket, setSocket] = useState<any>(null);
  //   if (socket) console.log('socket is ', socket.id);
  //   //   TODO: pull the userId and promptId from state
  //   const userId = 1;
  //   const chatType = 'Deep connection';

  //   //  once a user gets to the loading page, open up a websocket connection
  //   //  save that connection to state
  //   useEffect(() => {
  //     // const socket = socketIOClient(ENDPOINT);
  //     const newSocket = socketIOClient('http://localhost:4000', {
  //       transports: ['websocket'],
  //     });

  //     // TODO: lookup userId from state or cookie
  //     newSocket.emit('looking', userId, chatType);

  //     // add event listener to wait for the assigned room
  //     // add that room to state
  //     newSocket.on('room', (message: string) => {
  //       console.log(message);
  //       setRoom(message);
  //     });

  //     setSocket(newSocket);
  //   }, []);

  //   // set up listeners after socket is set up
  //   useEffect(() => {
  //     // add event listener to wait for a message
  //     // add that message to state
  //     if (socket) {
  //       // add event listener to wait for the assigned room
  //       // add that room to state
  //       socket.on('room', (message: string) => {
  //         console.log(message);
  //         setRoom(message);
  //       });
  //     }
  //   }, [socket]);
  let history = useHistory();
  const room = useSelector((state: IAppState) => state.basicState.room);
  if (room) history.push('/chat');
  console.log('room in state is ', room);

  return (
    <div>
      <h3>Finding you a match...</h3>
      <p>
        Please wait, we're pairing you with someone else interested in a deep
        connection{' '}
      </p>
    </div>
  );
};

export default Loading;
