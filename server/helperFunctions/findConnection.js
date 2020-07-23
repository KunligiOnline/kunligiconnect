// see if there's a potential connection in the queue of clients waiting for a connection
const findConnection = (connectionReq, chatQueue) => {
  // search through the chatQueue and see if there's a waiting client that wants to be in the same type of chat
  // if there's a match return the match
  for (let i = 0; i <= chatQueue.length - 1; i++) {
    const conn = chatQueue[i];
    if (
      conn.chatType === connectionReq.chatType &&
      ((conn.userId !== connectionReq.oldPartnerUserId &&
        connectionReq.oldPartnerUserId !== undefined) ||
        (connectionReq.userId !== conn.oldPartnerUserId &&
          conn.oldPartnerUserId !== undefined) ||
        (!conn.oldPartnerUserId && !connectionReq.oldPartnerUserId))
      // (!conn.oldPartnerUserId && !connectionReq.oldPartnerUserId))
    ) {
      chatQueue.splice(i, 1);
      return conn;
    }
  }
};

module.exports = findConnection;
