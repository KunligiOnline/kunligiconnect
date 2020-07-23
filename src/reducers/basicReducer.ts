import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';

export interface IBasicState {
    email: string;
    username: string;
    userId: number;
}

const initialBasicState: IBasicState = {
    email: '',
    username: '',
    userId: -Infinity,
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
          userId: action.userId,
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