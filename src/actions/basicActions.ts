import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IBasicState } from '../reducers/basicReducer';
import Cookies from 'js-cookie';


export enum BasicActionTypes {
  ANY = 'ANY',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SIGNUP = 'SIGNUP',
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

export type BasicActions = IBasicAnyAction | ILoginAction | ILogoutAction | ISignupAction;

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
          type: BasicActionTypes.LOGOUT
          })
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
