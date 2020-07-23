import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IBasicState } from '../reducers/basicReducer';
import socketIOClient from 'socket.io-client';
import Cookies from 'js-cookie';


export enum BasicActionTypes {
  ANY = 'ANY',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SIGNUP = 'SIGNUP',
  CREATESOCKET = 'CREATESOCKET',
  CREATEROOM = 'CREATEROOM',
  ADDMESSAGE = 'ADDMESSAGE',
  CHANGEPROMPT = 'CHANGEPROMPT',
}

export interface IBasicAnyAction {
  type: BasicActionTypes.ANY;
  property: any;
}

export interface ILoginAction {
  type: BasicActionTypes.LOGIN;
  username: string;
  id: number,
}

export interface ISignupAction {
  type: BasicActionTypes.SIGNUP;
  email: string;
  username: string;
}

export interface ILogoutAction {
  type: BasicActionTypes.LOGOUT;
}

export interface ICreateSocketAction {
  type: BasicActionTypes.CREATESOCKET;
  socket: any;
}

export interface ICreateRoomAction {
  type: BasicActionTypes.CREATEROOM;
  room: string;
}

export interface IAddMessage {
  type: BasicActionTypes.ADDMESSAGE;
  message: Message;
}

export interface IChangePrompt {
  type: BasicActionTypes.CHANGEPROMPT;
  prompt: Prompt;
}

export interface Prompt {
  id: number;
  prompt: string;
}

export interface Message {
  username: string;
  message: string;
  created_at: string;
}

export type BasicActions =
  | IBasicAnyAction
  | ILoginAction
  | ILogoutAction
  | ISignupAction
  | ICreateSocketAction
  | ICreateRoomAction
  | IAddMessage
  | IChangePrompt;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const basicAction: ActionCreator<ThunkAction<
  Promise<any>,
  IBasicState,
  null,
  IBasicAnyAction
>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      // Your logic here
      dispatch({
        property: null,
        type: BasicActionTypes.ANY,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const logoutAction: ActionCreator<ThunkAction<
  Promise<any>,
  IBasicState,
  null,
  ILogoutAction
>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      // delete cookie
      Cookies.remove('kunligi');
      // may have to re-route?
      console.log('logged out');
      dispatch({
        property: null,
        type: BasicActionTypes.LOGOUT,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const loginAction: ActionCreator<ThunkAction<
  Promise<any>,
  IBasicState,
  null,
  ILoginAction
>> = (username: string, id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      
      dispatch({
        username,
        id,
        type: BasicActionTypes.LOGIN,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const signupAction: ActionCreator<ThunkAction<
  Promise<any>,
  IBasicState,
  null,
  ISignupAction
>> = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    console.log('in signupAction, before fetch');
    try {
      
      dispatch({
            username,
            email,
            type: BasicActionTypes.SIGNUP,
        });
    
    } catch (err) {
      console.error(err);
    }
  };
};

// opens up a socket connection and tells the socket server the type of room it wants to be connected to
export const createSocketConn: ActionCreator<ThunkAction<
  Promise<any>,
  IBasicState,
  null,
  ICreateSocketAction
>> = () => {
  return async (dispatch: Dispatch, getState: any) => {
    console.log('creating a socket connection');

    const { chatType, userId } = getState().basicState;

    try {
      // set up a new socket connection
      const socket = await socketIOClient('http://localhost:4000', {
        transports: ['websocket'],
      });
      // fire event from the socket that it is now looking for a connection
      // socket.emit('looking', userId, chatType);
      socket.emit('looking', userId, chatType);

      // add event listener to wait for the assigned room
      // add that room to state
      socket.on('room', (room: string) => {
        dispatch(createRoom(room));
      });

      socket.on('new message', (messageData: Message) => {
        dispatch(addMessage(messageData));
      });

      socket.on('prompt', (newPrompt: Prompt) => {
        dispatch(changePrompt(newPrompt));
      });

      dispatch({
        socket: socket,
        type: BasicActionTypes.CREATESOCKET,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const createRoom = (room: string): ICreateRoomAction => ({
  type: BasicActionTypes.CREATEROOM,
  room: room,
});

export const addMessage = (message: Message): IAddMessage => ({
  type: BasicActionTypes.ADDMESSAGE,
  message: message,
});

export const changePrompt = (prompt: Prompt): IChangePrompt => ({
  type: BasicActionTypes.CHANGEPROMPT,
  prompt: prompt,
});
