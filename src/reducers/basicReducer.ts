import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';
import { Socket } from 'socket.io-client';
import { Prompt, Message } from '../actions/basicActions';

export interface IBasicState {
  email: string;
  username: string;
  userId: number | null;
  // socket: typeof Socket | null;
  socket: any;
  chatType: string;
  messages: Message[];
  prompt: Prompt | null;
  room: null | string;
}

const initialBasicState: IBasicState = {
  email: '',
  username: '',
  userId: null,
  socket: null,
  chatType: 'Deep connection',
  messages: [],
  prompt: null,
  room: null,
};

export const basicReducer: Reducer<IBasicState, BasicActions> = (
  state = initialBasicState,
  action
) => {
  switch (action.type) {
    case BasicActionTypes.ANY: {
      // logic here
      return {
        ...state,
        property: action.property,
      };
    }
    case BasicActionTypes.LOGIN: {
      console.log('in reducer, login! action: ', action);
      return {
        ...state,
        userId: action.userId,
        username: action.username,
      };
    }
    case BasicActionTypes.LOGOUT: {
      return initialBasicState;
    }
    case BasicActionTypes.SIGNUP: {
      console.log('in signup reducer, action is: ', action);
      return {
        ...state,
        username: action.username,
        email: action.email,
        userId: action.userId
      };
    }
    case BasicActionTypes.CREATESOCKET: {
      return { ...state, socket: action.socket };
    }
    case BasicActionTypes.CREATEROOM: {
      const room = action.room;
      return { ...state, room };
    }
    case BasicActionTypes.ADDMESSAGE: {
      const messages = [...state.messages, action.message];
      return { ...state, messages };
    }
    case BasicActionTypes.CHANGEPROMPT: {
      return { ...state, prompt: action.prompt };
    }
    
    case BasicActionTypes.GETCOOKIE: {
      console.log('in getcookie reducer, action is: ', action);
      return {
        ...state,
        username: action.username,
        userId: action.userId
      }
    }

    default:
      return state;
  }
};
