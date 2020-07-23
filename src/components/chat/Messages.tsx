import React from 'react';
import 'bulma/css/bulma.css';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';

const Messages: React.FC = () => {
  const { messages } = useSelector((state: IAppState) => state.basicState);
  console.log('in the messages comp, messages are: ', messages);
  return (
    <div>
      {/* <p> Messages here...</p> */}
      {messages.map((message) => {
        return (
          <p>
            {message.username}: {message.message}
          </p>
        );
      })}
    </div>
  );
};

export default Messages;
