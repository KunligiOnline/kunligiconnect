import React from 'react';
import Navbar from '../navigation/Navbar';
import Messages from '../chat/Messages';
import MessageInput from '../chat/MessageInput';

// will inlcude outes to home page and next question and next user
const Chat: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <p>Question here</p>
          {/* <button onClick={() => setLoadClient((prevState) => !prevState)}>
            TEST
          </button> */}
        </div>
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
