import React from 'react';
import 'bulma/css/bulma.css'
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

  let messageComponents = messageList.map(m => 
    <div className='messages-section'>
      <Message sender={m.sender} message={m.message} created_at={m.created_at}/>
    </div>
  );
  
  return(
      <div>
        {messageComponents}
      </div>
  )
}

export default Messages;