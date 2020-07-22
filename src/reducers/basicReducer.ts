import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';

export interface IBasicState {
    email: string;
    username: string;
    id: number;
}

const initialBasicState: IBasicState = {
    email: '',
    username: '',
    id: -Infinity,
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
          property: action.property
        };
      }
      case BasicActionTypes.LOGIN: {
        console.log('in reducer, login! action: ', action);
        return {
          ...state,
          id: action.id,
          username: action.username,
        }
        
      }
      case BasicActionTypes.LOGOUT: {
        return initialBasicState;
        // return {
        //   ...state,
        //   email: '',
        //   username: '',
        // }
      }
      case BasicActionTypes.SIGNUP: {
        console.log('in signup reducer, action is: ', action);
        return {
          ...state,
          username: action.username,
          email: action.email
        }
      }
      default:
        return state;
    }
  };