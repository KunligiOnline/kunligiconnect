
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IBasicState } from '../reducers/basicReducer';
import Cookies from 'js-cookies';

export enum BasicActionTypes {
    ANY = 'ANY',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export interface IBasicAnyAction {
    type: BasicActionTypes.ANY;
    property: any;
}

export interface ILoginAction {
  type: BasicActionTypes.LOGIN;
  email: string;
  displayName: string;
}

export interface ILogoutAction {
  type: BasicActionTypes.LOGOUT;
}

export type BasicActions = IBasicAnyAction | ILoginAction | ILogoutAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const basicAction: ActionCreator<ThunkAction<Promise<any>, IBasicState, null, IBasicAnyAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            // Your logic here
            dispatch({
            property: null,
            type: BasicActionTypes.ANY
            })
        } catch (err) {
        console.error(err);
        }
    };
};

export const logoutAction: ActionCreator<ThunkAction<Promise<any>, IBasicState, null, ILogoutAction>> = () => {
  return async (dispatch: Dispatch) => {
      try {
          // delete cookie
          Cookies.remove('kunligi');
          dispatch({
          property: null,
          type: BasicActionTypes.LOGOUT
          })
      } catch (err) {
      console.error(err);
      }
  };
};