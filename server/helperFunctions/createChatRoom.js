const db = require('./../models/model');
const crypto = require('crypto');

const createChatRoom = async (userId1, userId2) => {

  // generate random string that we can use to define the web id so we're not publicly exposing room primary keys
  const hash = crypto.randomBytes(20).toString('hex');
  const values = [hash, userId1, userId2];
  // This query performs three operations as a single transaction
  // First, it creates a new chat room
  // Next, it uses the id of that chat room to add a record for each user to the rooms_users table
  const query = `
        WITH chat AS (
            INSERT INTO public.rooms (hash) VALUES ($1) RETURNING id
        ), 

        first_room_user as (
        INSERT INTO public.rooms_users (room_id,user_id) 
        Select chat.id, $2 from chat
        returning room_id
        )

        INSERT INTO public.rooms_users (room_id,user_id) 
        Select first_room_user.room_id, $3 from first_room_user
    `;

  await db.query(query, values);
  //   return back the hash of the room
  //   this hash will be the id of the room

  return hash;
};

module.exports = createChatRoom;
