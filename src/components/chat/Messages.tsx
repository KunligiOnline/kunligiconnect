import React from 'react';
import 'bulma/css/bulma.css';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import 'bulma/css/bulma.css';
import Message from './Message';

const Messages: React.FC = () => {
  let messageList: { sender: string, message: string, created_at: string }[] = [ 
    { sender: 'carlos', 
    message: 'hello world', 
    created_at: '2:00pm' },
    { sender: 'tyler', 
    message: 'sup', 
    created_at: '2:01pm' },
    { sender: 'carlos', 
    message: 'hello world', 
    created_at: '2:00pm' },
    { sender: 'tyler', 
    message: 'sup', 
    created_at: '2:01pm' },
    { sender: 'carlos', 
    message: 'hello world', 
    created_at: '2:00pm' },
    { sender: 'tyler', 
    message: 'sup', 
    created_at: '2:01pm' },
    { sender: 'carlos', 
    message: 'hello world', 
    created_at: '2:00pm' },
    { sender: 'tyler', 
    message: 'sup', 
    created_at: '2:01pm' },
    { sender: 'carlos', 
    message: 'hello world', 
    created_at: '2:00pm' },
    { sender: 'tyler', 
    message: 'sup', 
    created_at: '2:01pm' },
    { sender: 'carlos', 
    message: 'hello world', 
    created_at: '2:00pm' },
    { sender: 'tyler', 
    message: 'sup', 
    created_at: '2:01pm' },
  ];
  const { messages, username } = useSelector(
    (state: IAppState) => state.basicState
  );

  let messageComponents = messages.map((m, index) => (
    <div className="messages-section">
      <Message
        key={'mess' + index}
        sender={m.username}
        message={m.message}
        created_at={m.created_at}
      />
    </div>
  ));

  return <div>{messageComponents}</div>;
};

export default Messages;
