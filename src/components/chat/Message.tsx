import React from 'react';
import '../../styles/bulmaStyles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../store/store';

export interface MessageProps {
  sender: string;
  message: string;
  created_at: string;
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  let { sender, message, created_at } = props;
  const username = useSelector((state: IAppState) => state.basicState.username);
  return (
    <article
      className={`message chat-message 
    ${sender === username ? 'is-warning from-user' : 'is-success from-other'}`}
    >
      <div className="message-header">
        <p>
          {sender} - {created_at}
        </p>
      </div>
      <div className="message-body">{message}</div>
    </article>
  );
};

export default Message;
