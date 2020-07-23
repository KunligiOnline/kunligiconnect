import React from 'react';
import 'bulma/css/bulma.css';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import 'bulma/css/bulma.css';
import Message from './Message';

const Messages: React.FC = () => {
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
