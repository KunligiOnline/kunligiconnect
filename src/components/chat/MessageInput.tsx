import React, { KeyboardEvent } from 'react';
// import 'bulma/css/bulma.css'
import '../../styles/bulmaStyles.scss';

const MessageInput: React.FC = () => {

  function sendMessage(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      // send message
    }
  }

  return(
    <div className="media chat-input">
      <div className="media-content">
        <div className="field">
          <p className="control">
            <input className="input is-primary" type="text" onKeyDown={sendMessage} placeholder="Chat away..."/>
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <a className="button is-info">Next Question</a>
            </div>
            <div className="level-item">
              <a className="button is-info">Next Match</a>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a className="button is-primary">Submit</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MessageInput;