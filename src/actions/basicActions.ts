import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IBasicState } from '../reducers/basicReducer';
import Cookies from 'js-cookie';

const serverUrl = 'http://localhost:4000';

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
  email: string;
  username: string;
  password: string;
}

export interface ISignupAction {
  type: BasicActionTypes.SIGNUP;
  email: string;
  username: string;
  password: string;
}

export interface ILogoutAction {
  type: BasicActionTypes.LOGOUT;
}

export type BasicActions = IBasicAnyAction | ILoginAction | ILogoutAction;

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
      dispatch({
        property: null,
        type: BasicActionTypes.LOGOUT,
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

      const body = JSON.stringify({
        username,
        email,
        password,
      });
      const result = await (
        await fetch(`${serverUrl}/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        })
      ).json();
      console.log('in signupAction, after fetch: ', result);
    //   dispatch({
    //     property: null,
    //     type: BasicActionTypes.SIGNUP,
    //   });
    } catch (err) {
      console.error(err);
    }
  };
};
