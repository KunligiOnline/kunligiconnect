import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';
import { Socket } from 'socket.io-client';

export interface IBasicState {
  email: string;
  username: string;
  userId: number;
  // socket: typeof Socket | null;
  socket: any;
  chatType: string;
  messages: [];
  prompt: {};
  room: null | string;
}

const initialBasicState: IBasicState = {
  email: '',
  username: '',
  userId: 1,
  socket: null,
  chatType: 'Deep connection',
  messages: [],
  prompt: {},
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
      // return {
      //   ...state,
      //   email: '',
      //   username: '',
      // }
    }
    case BasicActionTypes.CREATESOCKET: {
      return { ...state, socket: action.socket };
    }
    case BasicActionTypes.CREATEROOM: {
      console.log('in the create rooom reducer with action ', action.room);
      const room = action.room;
      return { ...state, room };
    }
    case BasicActionTypes.ADDMESSAGE: {
      const messages = [...state.messages, action.message];
      return { ...state };
    }
    case BasicActionTypes.CHANGEPROMPT: {
      return { ...state, prompt: action.prompt };
    }

    default:
      return state;
  }
};
