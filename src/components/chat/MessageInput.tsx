import React, { KeyboardEvent, useState } from 'react';
// import 'bulma/css/bulma.css'
import '../../styles/bulmaStyles.scss';
import { useDispatch } from 'react-redux';
import { createSocketConn, Message } from '../../actions/basicActions';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';

const MessageInput: React.FC = () => {
  const { userId, socket, room, prompt, chatType } = useSelector(
    (state: IAppState) => state.basicState
  );
  const [message, setMessage] = useState('');

  // submit message on 'Enter'
  function sendMessage(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  // event that asks the websocket server for a new question
  const handleChangeQuestion = () => {
    socket.emit('get new prompt', room, chatType);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    setMessage(inputVal);
  };

  // on submit, broadcast the message to all users in the chat
  // reset the input field
  const handleSubmit = () => {
    if (prompt && message.length > 0) {
      socket.emit('message', userId, message, prompt.id, room);
      setMessage('');
    }
  };

  return (
    <div className="media">
      <div className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </div>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <input
              className="input is-primary"
              type="text"
              value={message}
              onKeyDown={sendMessage}
              onChange={handleInputChange}
              placeholder="Chat away..."
            />
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item" onClick={handleChangeQuestion}>
              <a className="button is-info">Next Question</a>
            </div>
            <div className="level-item">
              <a className="button is-info">Next Match</a>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item" onClick={handleSubmit}>
              <a className="button is-primary">Submit</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MessageInput;
