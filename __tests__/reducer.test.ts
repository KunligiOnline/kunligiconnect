import { basicReducer, IBasicState } from '../src/reducers/basicReducer';
import {
  ISignupAction,
  BasicActionTypes,
  ICreateRoomAction,
  IClearChatAction,
  IAddMessage,
} from '../src/actions/basicActions';

describe('MegaMarkets reducer', () => {
  let state: IBasicState;

  beforeEach(() => {
    state = {
      email: '',
      username: '',
      userId: null,
      socket: null,
      chatType: '',
      messages: [],
      prompt: null,
      room: null,
    };
  });

  describe('Sign up', () => {
    // create  action with a payload and assign to a variable
    const action: ISignupAction = {
      type: BasicActionTypes.SIGNUP,
      email: 'test@test.com',
      username: 'test mctesterson',
      userId: 1000,
    };

    it('Adds user to state', () => {
      // run the market reducer function and assign the newLocation to a variable
      const { email, username, userId } = basicReducer(state, action);
      // check that the new user data is the same as the data passed into the payload
      expect(email).toEqual(action.email);
      expect(username).toEqual(action.username);
      expect(userId).toEqual(action.userId);
    });

    it('returns a state object not strictly equal to the original', () => {
      // run reducer on action assign to a variable
      const result = basicReducer(state, action);
      // check that the result of basicReducer is not strictly equal to former state.
      expect(result).not.toBe(state);
    });
  });

  describe('Create room', () => {
    const action: ICreateRoomAction = {
      type: BasicActionTypes.CREATEROOM,
      room: 'abcdefghijkl',
    };

    it('Sets new room in state', () => {
      const { room } = basicReducer(state, action);
      expect(room).toEqual(action.room);
    });

    it('returns a state object not strictly equal to the original', () => {
      const result = basicReducer(state, action);
      expect(result).not.toBe(state);
    });
  });

  describe('Clear room', () => {
    const action: IClearChatAction = {
      type: BasicActionTypes.CLEARCHAT,
    };

    it('the room and the message history are cleared from state', () => {
      const { messages, room } = basicReducer(state, action);
      expect(messages).toEqual([]);
      expect(room).toEqual(null);
    });
  });

  describe('Add messsage to chat history', () => {
    const action: IAddMessage = {
      type: BasicActionTypes.ADDMESSAGE,
      message: {
        username: 'Test mctesterson',
        message: 'Howdy partner',
        created_at: '1/1/2000',
      },
    };

    it('Message added to the list of messaages', () => {
      const { messages } = basicReducer(state, action);
      expect(messages[0]).toEqual(action.message);
    });

    it('Original array of messages is not directly mutated', () => {
      const { messages } = basicReducer(state, action);
      expect(messages).not.toBe(state.messages);
    });
  });
});
