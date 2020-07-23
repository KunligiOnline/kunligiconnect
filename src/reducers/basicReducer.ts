import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';
import { Socket } from 'socket.io-client';
import { Prompt, Message } from '../actions/basicActions';

export interface IBasicState {
  email: string;
  username: string;
  userId: number;
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
  userId: 1,
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
      return {
        ...state,
        property: action.property,
      };
    }
    case BasicActionTypes.LOGIN: {
      return {
        ...state,
        email: action.email,
        username: action.username,
        password: action.password,
      };
    }
    case BasicActionTypes.LOGOUT: {
      return initialBasicState;
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

    default:
      return state;
  }
};
