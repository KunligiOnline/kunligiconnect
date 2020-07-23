const db = require('./../models/model');

const storeMessage = async (userId, message, promptId, hash) => {

  const valuesAddMessage = [hash, userId, promptId, message];
  //   query finds room associated with a hash
  //   then the query associates a message to that user_id and room_it
  const queryAddMessage = `
    with room_lookup as (
    select id from rooms
    where hash = $1
    Limit 1
    )
    
    Insert into messages (room_id,user_id,prompt_id,message) 
    select room_lookup.id,$2,$3,$4 from room_lookup
    returning id    
    `;

  let result1 = await db.query(queryAddMessage, valuesAddMessage);
  let messageId = result1.rows[0].id;

  //  get additional metadata about the message that we can broadcast to other users
  const valuesGetMessage = [messageId];
  const queryGetMessage = `
        select users.username, messages.message, messages.created_at
        from messages
        left join users on users.id = messages.user_id
        where messages.id = $1
        limit 1
  `;
  const result2 = await db.query(queryGetMessage, valuesGetMessage);
  return result2.rows[0];
};

module.exports = storeMessage;
